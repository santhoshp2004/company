import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { authorize } from '../middleware/role.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth);
router.use(authorize(['Super Admin', 'HR Admin']));

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, password, mobile, department, designation, role, status } = req.body;
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: 'Email already exists' });
    const hashed = await bcrypt.hash(password || 'Password123!', 12);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      mobile,
      department,
      designation,
      role: role || 'Employee',
      status: status || 'Active',
    });
    res.status(201).json({ message: 'User created', user: { ...user.toObject(), password: undefined } });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 12);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
