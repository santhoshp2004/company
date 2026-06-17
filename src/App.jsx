import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme, THEMES } from './context/ThemeContext';

import Navbar          from './components/Navbar';
import Footer          from './components/Footer';
import ProtectedRoute  from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import ThemeSwitcher   from './components/ThemeSwitcher';

import Home            from './pages/Home';
import Products        from './pages/Products';
import ProductDetails  from './pages/ProductDetails';
import Careers         from './pages/Careers';
import Partners        from './pages/Partners';
import About           from './pages/About';
import Support         from './pages/Support';
import Login           from './pages/Login';
import Register        from './pages/Register';
import Profile         from './pages/Profile';
import Dashboard       from './pages/Dashboard';
import BrandShowcase   from './pages/BrandShowcase';
import AdminLayout     from './admin/AdminLayout';

/** Smooth page transition wrapper */
function PageTransition({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/** Theme-aware main layout */
function MainLayout() {
  const location = useLocation();
  const { theme, t } = useTheme();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={`flex flex-col min-h-screen theme-transition`} style={t.pageBgStyle}>
      {!isAdminRoute && <Navbar />}
      <div className="flex-1">
        <PageTransition>
          <Routes>
            <Route path="/"              element={<Home />} />
            <Route path="/products"      element={<Products />} />
            <Route path="/products/:id"  element={<ProductDetails />} />
            <Route path="/careers"       element={<Careers />} />
            <Route path="/partners"      element={<Partners />} />
            <Route path="/about"         element={<About />} />
            <Route path="/support"       element={<Support />} />
            <Route path="/brand"         element={<BrandShowcase />} />
            <Route path="/profile"       element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/dashboard"     element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/*"       element={
              <AdminProtectedRoute roles={['Super Admin', 'HR Admin', 'Content Manager', 'Recruiter', 'Employee']}>
                <AdminLayout />
              </AdminProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </div>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <ThemeSwitcher />}
    </div>
  );
}

/** Auth pages also get ThemeSwitcher so user can pick theme on login screen */
function AuthLayout({ children }) {
  return (
    <>
      {children}
      <ThemeSwitcher />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth — no Navbar/Footer */}
            <Route path="/login"    element={<AuthLayout><Login /></AuthLayout>} />
            <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
            {/* All other routes */}
            <Route path="/*" element={<MainLayout />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

function NotFound() {
  const { t } = useTheme();
  return (
    <main className="min-h-screen flex items-center justify-center" style={t.pageBgStyle}>
      <div className="text-center">
        <p className={`text-8xl font-black mb-4 ${t.gradientText}`}>404</p>
        <h2 className={`text-2xl font-bold mb-2 ${t.textPrimary}`}>Page not found</h2>
        <p className={`mb-6 ${t.textSecondary}`}>The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-primary inline-flex">Go Home</a>
      </div>
    </main>
  );
}
