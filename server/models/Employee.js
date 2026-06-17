import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String },
  designation: { type: String },
  status: { type: String, enum: ['Active', 'On Leave', 'Inactive'], default: 'Active' },
  attendancePercent: { type: Number, default: 100 },
  leaveBalance: { type: Number, default: 0 },
  performanceNotes: { type: String },
  trainingPrograms: { type: [String], default: [] },
}, {
  timestamps: true,
});

export default mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
