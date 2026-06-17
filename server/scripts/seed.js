import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Job from '../models/Job.js';
import ContactRequest from '../models/ContactRequest.js';
import Partner from '../models/Partner.js';
import Employee from '../models/Employee.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seed = async () => {
  await connectDB();
  await Promise.all([
    User.deleteMany(),
    Job.deleteMany(),
    ContactRequest.deleteMany(),
    Partner.deleteMany(),
    Employee.deleteMany(),
  ]);

  const password = await bcrypt.hash('BetaSoftnet123!', 12);

  await User.create([
    { name: 'Super Admin', email: 'admin@betasoftnet.com', password, role: 'Super Admin', department: 'Executive', designation: 'Administrator', status: 'Active' },
    { name: 'HR Admin', email: 'hr@betasoftnet.com', password, role: 'HR Admin', department: 'HR', designation: 'HR Lead', status: 'Active' },
    { name: 'Content Manager', email: 'content@betasoftnet.com', password, role: 'Content Manager', department: 'Content', designation: 'Content Lead', status: 'Active' },
    { name: 'Recruiter', email: 'recruiter@betasoftnet.com', password, role: 'Recruiter', department: 'Hiring', designation: 'Recruitment Lead', status: 'Active' },
  ]);

  await Job.create([
    { title: 'Senior Product Designer', department: 'Design', experience: '5+ years', skills: ['Figma', 'UX Research', 'Prototyping'], salaryRange: '₹16L - ₹22L', location: 'Bangalore', description: 'Lead product design for enterprise portals.', status: 'Open' },
    { title: 'Fullstack Engineer', department: 'Engineering', experience: '4+ years', skills: ['React', 'Node.js', 'MongoDB'], salaryRange: '₹18L - ₹26L', location: 'Remote', description: 'Deliver end-to-end SaaS modules.', status: 'Published' },
  ]);

  await ContactRequest.create([
    { name: 'Nisha Rao', email: 'nisha@clientmail.com', message: 'I want to discuss enterprise hiring workflows.', category: 'Client', assignedTo: 'HR Admin', status: 'Pending' },
    { name: 'Ethan Roy', email: 'ethan@partner.com', message: 'Partner application for technology collaboration.', category: 'Partner', assignedTo: 'Content Manager', status: 'New' },
  ]);

  await Partner.create([
    { name: 'CloudWave', category: 'Technology Partner', website: 'https://cloudwave.io', contactPerson: 'Isha Kapoor', email: 'isha@cloudwave.io', status: 'Approved' },
    { name: 'GrowthEdge', category: 'Strategic Partner', website: 'https://growthedge.com', contactPerson: 'Raj Malhotra', email: 'raj@growthedge.com', status: 'Pending' },
  ]);

  await Employee.create([
    { name: 'Aditi Verma', department: 'Engineering', designation: 'Senior Engineer', status: 'Active', attendancePercent: 98, leaveBalance: 12, trainingPrograms: ['Leadership', 'Advanced React'] },
    { name: 'Sameer Jain', department: 'Sales', designation: 'Account Manager', status: 'Active', attendancePercent: 94, leaveBalance: 8, trainingPrograms: ['Negotiation', 'CRM Excellence'] },
  ]);

  console.log('Seed completed');
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
