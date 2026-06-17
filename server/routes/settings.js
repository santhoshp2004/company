import express from 'express';
import Setting from '../models/Setting.js';
import { requireAuth } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';

const router = express.Router();

router.use(requireAuth);
router.use(authorize(['Super Admin']));

router.get('/', async (req, res, next) => {
  try {
    const settings = await Setting.find().sort({ createdAt: -1 });
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const setting = await Setting.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(setting);
  } catch (err) {
    next(err);
  }
});

export default router;
