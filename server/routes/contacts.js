import express from 'express';
import ContactRequest from '../models/ContactRequest.js';
import { requireAuth } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';

const router = express.Router();

router.use(requireAuth);
router.use(authorize(['Super Admin', 'HR Admin', 'Content Manager', 'Recruiter']));

router.get('/', async (req, res, next) => {
  try {
    const items = await ContactRequest.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const item = await ContactRequest.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const item = await ContactRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

export default router;
