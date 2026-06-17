import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Technology Partner', 'Strategic Partner', 'Partner Applicant'], default: 'Technology Partner' },
  website: { type: String },
  contactPerson: { type: String },
  email: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  profile: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Partner || mongoose.model('Partner', partnerSchema);
