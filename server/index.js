import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = path.join(__dirname, 'applications.json');

// Ensure the file exists
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify([]));
}

// GET all applications
app.get('/api/applications', (req, res) => {
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read applications' });
  }
});

// POST new application
app.post('/api/applications', (req, res) => {
  try {
    const newApp = req.body;
    const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
    data.push(newApp);
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
    res.status(201).json(newApp);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save application' });
  }
});

// PUT update application
app.put('/api/applications/:id', (req, res) => {
  try {
    const appId = req.params.id;
    const updates = req.body;
    const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
    
    const index = data.findIndex(a => a.id === appId);
    if (index === -1) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    // Check if we need to send an email
    const isSendingEmail = updates.sendEmail === true;

    // Remove the flag so it doesn't get saved into the database forever
    if (isSendingEmail) {
      delete updates.sendEmail;
    }

    data[index] = { ...data[index], ...updates };
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
    
    // Simulate Email if requested
    if (isSendingEmail) {
      console.log(`\n======================================`);
      console.log(`[EMAIL SYSTEM] Sending email to ${data[index].email}...`);
      console.log(`[EMAIL SYSTEM] Subject: Interview Scheduled for ${data[index].jobRole}`);
      console.log(`[EMAIL SYSTEM] Body: Dear ${data[index].name}, your interview has been scheduled.`);
      console.log(`[EMAIL SYSTEM] Date: ${data[index].interviewDate}`);
      console.log(`[EMAIL SYSTEM] Time: ${data[index].interviewTime}`);
      console.log(`[EMAIL SYSTEM] Venue/Link: ${data[index].interviewVenue}`);
      console.log(`======================================\n`);
    }

    res.json(data[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update application' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
