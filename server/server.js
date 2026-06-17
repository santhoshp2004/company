import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));

// In-memory storage
let products = [
  { _id: '1', name: 'Admin Dashboard', description: 'Manage users, jobs, and content', price: 'Free', status: 'Active' },
  { _id: '2', name: 'HR Portal', description: 'Employee management system', price: '$99/mo', status: 'Active' },
  { _id: '3', name: 'Recruitment Suite', description: 'Job posting and tracking', price: '$149/mo', status: 'Active' },
];

// Admin credentials (hardcoded)
const ADMIN_EMAIL = 'admin@betasoftnet.com';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('BetaSoftnet123!', 12);

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }

    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: 'admin-1', email: ADMIN_EMAIL, role: 'Super Admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        _id: 'admin-1',
        name: 'Super Admin',
        email: ADMIN_EMAIL,
        role: 'Super Admin',
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Product Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  try {
    const { name, description, price, status } = req.body;
    const newProduct = {
      _id: Date.now().toString(),
      name,
      description,
      price,
      status: status || 'Active',
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const product = products.find((p) => p._id === req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    Object.assign(product, req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    products = products.filter((p) => p._id !== req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Analytics (dummy data)
app.get('/api/analytics', (req, res) => {
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

app.use((req, res) => res.status(404).json({ message: 'Not Found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Admin API running on http://localhost:${PORT}`);
  console.log(`📧 Admin Email: ${ADMIN_EMAIL}`);
  console.log(`🔐 Admin Password: BetaSoftnet123!`);
});

