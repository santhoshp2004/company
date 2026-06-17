import express from 'express';
import Partner from '../models/Partner.js';
import { requireAuth } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';

const router = express.Router();

router.use(requireAuth);
router.use(authorize(['Super Admin', 'HR Admin', 'Content Manager']));

router.get('/', async (req, res, next) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.json(partners);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const partner = await Partner.create(req.body);
    res.status(201).json(partner);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(partner);
  } catch (err) {
    next(err);
  }
});

export default router;
