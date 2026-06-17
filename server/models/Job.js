import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  experience: { type: String },
  skills: { type: [String], default: [] },
  salaryRange: { type: String },
  location: { type: String },
  description: { type: String },
  status: { type: String, enum: ['Draft', 'Open', 'Closed', 'Published'], default: 'Draft' },
  publishedAt: { type: Date },
}, {
  timestamps: true,
});

export default mongoose.models.Job || mongoose.model('Job', jobSchema);
