import express from 'express';
import Setting from '../models/Setting.js';
import { requireAuth } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';

const router = express.Router();

router.use(requireAuth);
router.use(authorize(['Super Admin', 'Content Manager']));

router.get('/', async (req, res, next) => {
  try {
    const content = await Setting.find({ key: /^content\./ });
    res.json(content);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const item = await Setting.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const item = await Setting.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

export default router;
