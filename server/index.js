import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = path.join(__dirname, 'applications.json');
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify([]));
}

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';

let useMongo = false;
let ApplicationModel = null;

const applicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  jobId: String,
  jobRole: String,
  name: String,
  email: String,
  phone: String,
  resume: String,
  experience: String,
  skills: String,
  coverLetter: String,
  status: { type: String, default: 'Applied' },
  createdAt: { type: Date, default: Date.now },
  applicationDate: { type: Date, default: Date.now },
  interview: {
    date: String,
    time: String,
    mode: String,
    meetingLink: String,
    location: String,
    notes: String,
    scheduledAt: Date,
  },
  attendanceConfirmed: { type: Boolean, default: false },
  confirmationToken: String,
  emailHistory: [
    {
      type: String,
      subject: String,
      body: String,
      to: String,
      status: String,
      error: String,
      sentAt: Date,
    }
  ],
  reminders: {
    reminder24Sent: { type: Boolean, default: false },
    reminder1Sent: { type: Boolean, default: false },
  },
}, { versionKey: false });

async function connectMongo() {
  if (!MONGO_URI) return;
  try {
    await mongoose.connect(MONGO_URI, { autoIndex: true });
    ApplicationModel = mongoose.models.Application || mongoose.model('Application', applicationSchema);
    useMongo = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection failed, using file storage fallback', err);
  }
}

const transporter = SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null;

function makeId() {
  return crypto.randomBytes(8).toString('hex');
}

function readList(key) {
  try {
    const raw = fs.readFileSync(FILE_PATH, 'utf8');
    const list = JSON.parse(raw || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function writeList(list) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(list, null, 2));
}

function getInterviewDateTime(app) {
  if (!app?.interview?.date || !app?.interview?.time) return null;
  const candidate = `${app.interview.date}T${app.interview.time}:00`;
  const dt = new Date(candidate);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function buildConfirmationUrl(token) {
  return `${BACKEND_URL}/api/applications/confirm?token=${encodeURIComponent(token)}`;
}

function buildInterviewEmailBody(app, interview, confirmUrl) {
  return `Dear ${app.name},

Congratulations!

Your application for the ${app.jobRole || 'MERN Stack Developer'} position has been shortlisted.

Interview Details:

Date: ${interview.date}
Time: ${interview.time}
Mode: ${interview.mode || 'Online'}

Meeting Link:
${interview.meetingLink || 'N/A'}

Location:
${interview.location || 'N/A'}

Notes:
${interview.notes || 'No additional notes.'}

Please join 10 minutes before the scheduled time.

Confirm your attendance using this link:
${confirmUrl}

Best Regards,
HR Team
Company Name`;
}

async function persistApplication(app) {
  if (useMongo && ApplicationModel) {
    const existing = await ApplicationModel.findOne({ id: app.id });
    if (existing) {
      existing.overwrite(app);
      return await existing.save();
    }
    return await new ApplicationModel(app).save();
  }

  const applications = readList('applications');
  const index = applications.findIndex(item => item.id === app.id);
  if (index >= 0) {
    applications[index] = app;
  } else {
    applications.push(app);
  }
  writeList(applications);
  return app;
}

async function fetchApplications() {
  if (useMongo && ApplicationModel) {
    return await ApplicationModel.find({}).sort({ createdAt: -1 }).lean();
  }
  return readList('applications');
}

async function fetchApplicationById(id) {
  if (useMongo && ApplicationModel) {
    return await ApplicationModel.findOne({ id }).lean();
  }
  return readList('applications').find(item => item.id === id) || null;
}

async function fetchApplicationByToken(token) {
  if (useMongo && ApplicationModel) {
    return await ApplicationModel.findOne({ confirmationToken: token }).lean();
  }
  return readList('applications').find(item => item.confirmationToken === token) || null;
}

function slotConflict(apps, currentId, interview) {
  if (!interview?.date || !interview?.time) return false;
  return apps.some((item) => {
    if (item.id === currentId) return false;
    return item.interview?.date === interview.date && item.interview?.time === interview.time;
  });
}

async function updateApplicationById(id, updates) {
  const existing = await fetchApplicationById(id);
  if (!existing) return null;
  const merged = { ...existing, ...updates };
  if (updates.interview) {
    merged.interview = { ...existing.interview, ...updates.interview, scheduledAt: new Date().toISOString() };
  }
  return persistApplication(merged);
}

async function sendInterviewEmail(app, interview, type = 'Interview Invitation') {
  const token = app.confirmationToken || makeId();
  const updatedApp = { ...app, confirmationToken: token, emailHistory: Array.isArray(app.emailHistory) ? [...app.emailHistory] : [] };
  const confirmUrl = buildConfirmationUrl(token);
  const subject = 'Interview Invitation - MERN Stack Developer';
  const body = buildInterviewEmailBody(updatedApp, interview, confirmUrl);
  const historyItem = {
    type,
    subject,
    body,
    to: updatedApp.email,
    status: 'failed',
    error: '',
    sentAt: new Date().toISOString(),
  };

  if (transporter) {
    try {
      await transporter.sendMail({
        from: SMTP_FROM,
        to: updatedApp.email,
        subject,
        text: body,
      });
      historyItem.status = 'sent';
    } catch (err) {
      historyItem.error = err.message;
      console.error('Email send failed:', err);
    }
  } else {
    historyItem.error = 'SMTP not configured';
    console.warn('SMTP not configured, skipping actual email send');
  }

  updatedApp.emailHistory.push(historyItem);
  await persistApplication(updatedApp);
  return updatedApp;
}

async function maybeSendReminderEmails() {
  const apps = await fetchApplications();
  const now = new Date();
  for (const app of apps) {
    const interviewDate = getInterviewDateTime(app);
    if (!interviewDate || app.status !== 'Interview Scheduled') continue;
    const diffMs = interviewDate.getTime() - now.getTime();

    if (diffMs <= 24 * 60 * 60 * 1000 && diffMs > 59 * 60 * 1000 && !app.reminders?.reminder24Sent) {
      await sendReminder(app, '24-hour reminder');
    }
    if (diffMs <= 60 * 60 * 1000 && diffMs > 0 && !app.reminders?.reminder1Sent) {
      await sendReminder(app, '1-hour reminder');
    }
  }
}

async function sendReminder(app, reminderType) {
  const interview = app.interview;
  if (!interview) return;
  const updatedApp = { ...app, emailHistory: Array.isArray(app.emailHistory) ? [...app.emailHistory] : [], reminders: { ...app.reminders } };
  const subject = `Interview Reminder - ${reminderType}`;
  const confirmUrl = buildConfirmationUrl(updatedApp.confirmationToken || makeId());
  const body = `Dear ${updatedApp.name},

This is a reminder for your upcoming interview for the ${updatedApp.jobRole || 'MERN Stack Developer'} position.

Interview Details:

Date: ${interview.date}
Time: ${interview.time}
Mode: ${interview.mode || 'Online'}

Meeting Link:
${interview.meetingLink || 'N/A'}

Location:
${interview.location || 'N/A'}

Notes:
${interview.notes || 'No additional notes.'}

Please join 10 minutes before the scheduled time.

Confirm your attendance using this link:
${confirmUrl}

Best Regards,
HR Team
Company Name`;
  const historyItem = {
    type: reminderType,
    subject,
    body,
    to: updatedApp.email,
    status: 'failed',
    error: '',
    sentAt: new Date().toISOString(),
  };

  if (transporter) {
    try {
      await transporter.sendMail({ from: SMTP_FROM, to: updatedApp.email, subject, text: body });
      historyItem.status = 'sent';
    } catch (err) {
      historyItem.error = err.message;
      console.error('Reminder email failed:', err);
    }
  } else {
    historyItem.error = 'SMTP not configured';
  }

  updatedApp.emailHistory.push(historyItem);
  if (reminderType.includes('24')) updatedApp.reminders.reminder24Sent = true;
  if (reminderType.includes('1-hour')) updatedApp.reminders.reminder1Sent = true;
  await persistApplication(updatedApp);
}

app.get('/api/applications', async (req, res) => {
  try {
    const applications = await fetchApplications();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read applications' });
  }
});

app.post('/api/applications', async (req, res) => {
  try {
    const payload = req.body;
    const newApp = {
      ...payload,
      id: makeId(),
      status: 'Applied',
      createdAt: new Date().toISOString(),
      applicationDate: new Date().toISOString(),
      confirmationToken: makeId(),
      emailHistory: [],
      reminders: { reminder24Sent: false, reminder1Sent: false },
      attendanceConfirmed: false,
    };
    const saved = await persistApplication(newApp);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save application' });
  }
});

app.put('/api/applications/:id', async (req, res) => {
  try {
    const appId = req.params.id;
    const updates = { ...req.body };
    const existing = await fetchApplicationById(appId);
    if (!existing) return res.status(404).json({ error: 'Application not found' });

    if (updates.interview && slotConflict(await fetchApplications(), appId, updates.interview)) {
      return res.status(409).json({ error: 'Interview slot already booked' });
    }

    let updatedApp = { ...existing, ...updates };
    if (updates.interview) {
      updatedApp.interview = { ...existing.interview, ...updates.interview, scheduledAt: new Date().toISOString() };
      updatedApp.status = updates.status || 'Interview Scheduled';
    }

    if (updates.sendEmail === true) {
      const interview = updatedApp.interview;
      if (!interview?.date || !interview?.time) {
        return res.status(400).json({ error: 'Interview details are required to send invitation' });
      }
      updatedApp = await sendInterviewEmail(updatedApp, interview, 'Interview Invitation');
      updatedApp.status = 'Interview Scheduled';
    }

    delete updates.sendEmail;
    const saved = await persistApplication(updatedApp);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update application' });
  }
});

app.delete('/api/applications/:id', async (req, res) => {
  try {
    const appId = req.params.id;
    if (useMongo && ApplicationModel) {
      const result = await ApplicationModel.deleteOne({ id: appId });
      if (result.deletedCount === 0) return res.status(404).json({ error: 'Application not found' });
      return res.status(204).send();
    }

    let data = readList('applications');
    const initialLength = data.length;
    data = data.filter(a => a.id !== appId);
    if (data.length === initialLength) {
      return res.status(404).json({ error: 'Application not found' });
    }
    writeList(data);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

app.get('/api/applications/confirm', async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) return res.status(400).send('<h1>Invalid confirmation token</h1>');
    const application = await fetchApplicationByToken(token);
    if (!application) return res.status(404).send('<h1>Confirmation token not found</h1>');
    if (!application.attendanceConfirmed) {
      application.attendanceConfirmed = true;
      application.status = 'Interview Confirmed';
      await persistApplication(application);
    }
    res.send(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Attendance Confirmed</title></head><body style="font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;background:#f8fafc;"><div style="max-width:640px;padding:32px;border-radius:24px;background:#ffffff;box-shadow:0 30px 80px rgba(15,23,42,0.12);text-align:center;"><h1 style="font-size:26px;margin-bottom:16px;color:#0f172a;">Attendance Confirmed</h1><p style="font-size:16px;color:#475569;margin-bottom:24px;">Thank you, ${application.name}. Your interview attendance has been confirmed.</p><p style="font-size:14px;color:#64748b;">Position: ${application.jobRole}</p></div></body></html>`);
  } catch (error) {
    res.status(500).send('<h1>Unable to confirm attendance</h1>');
  }
});

connectMongo();
setInterval(maybeSendReminderEmails, 60 * 1000);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (!transporter) {
    console.warn('SMTP is not configured. Email sending will be disabled.');
  }
});
