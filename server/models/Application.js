import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: { type: String, enum: ['New', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected'], default: 'New' },
  resumeUrl: { type: String },
  skills: { type: [String], default: [] },
  notes: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Application || mongoose.model('Application', applicationSchema);
