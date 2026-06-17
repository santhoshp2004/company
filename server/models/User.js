import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  mobile: { type: String },
  department: { type: String },
  designation: { type: String },
  role: {
    type: String,
    enum: ['Super Admin', 'HR Admin', 'Content Manager', 'Recruiter', 'Employee'],
    default: 'Employee',
  },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', userSchema);
