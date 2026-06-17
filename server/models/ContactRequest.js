import mongoose from 'mongoose';

const contactRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  category: { type: String, enum: ['General', 'Support', 'Client', 'Partner'], default: 'General' },
  assignedTo: { type: String },
  status: { type: String, enum: ['New', 'Pending', 'Resolved', 'Closed'], default: 'New' },
  response: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.ContactRequest || mongoose.model('ContactRequest', contactRequestSchema);
