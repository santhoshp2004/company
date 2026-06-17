import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';

const router = express.Router();

router.use(requireAuth);
router.use(authorize(['Super Admin', 'HR Admin', 'Content Manager', 'Recruiter']));

router.get('/', async (req, res) => {
  res.json({
    users: 1280,
    employees: 356,
    applications: 1420,
    activeJobs: 42,
    visitors: 57800,
    contactRequests: 122,
    revenue: 495000,
    charts: {
      monthlyApplications: [24, 36, 42, 53, 68, 74, 83, 91, 102, 118, 129, 141],
      traffic: [12, 22, 28, 48, 61, 72, 88, 94, 103, 112, 127, 134],
      employeeGrowth: [8, 16, 19, 26, 34, 45, 53, 61, 70, 80, 92, 101],
      jobPostingAnalytics: [10, 18, 30, 39, 52, 60, 72, 79, 86, 93, 106, 118],
    },
  });
});

export default router;
