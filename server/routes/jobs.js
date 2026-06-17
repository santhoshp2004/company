import express from 'express';
import Job from '../models/Job.js';
import { requireAuth } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';

const router = express.Router();

router.use(requireAuth);
router.use(authorize(['Super Admin', 'HR Admin', 'Recruiter']));

router.get('/', async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ updatedAt: -1 });
    res.json(jobs);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
