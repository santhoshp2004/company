import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme, THEMES } from '../context/ThemeContext';
import Logo from './Logo';
import SearchBar from './SearchBar';

/* ─── Product catalogue data ─── */
const PRODUCT_CATEGORIES = [
  {
    key: 'business',
    label: 'Business',
    icon: '🏢',
    color: 'from-blue-500 to-indigo-600',
    products: [
      { name: 'Beta ERP', badge: 'ERP', desc: 'Integrated enterprise resource planning with inventory, procurement and finance.', icon: '🏭' },
      { name: 'Beta CRM', badge: 'CRM', desc: 'Manage leads, sales pipelines and customer relationships end-to-end.', icon: '🤝' },
      { name: 'Beta Inventory', badge: 'INV', desc: 'Real-time stock tracking, warehouse management and procurement automation.', icon: '📦' },
      { name: 'Beta HRMS', badge: 'HR', desc: 'Complete HR — payroll, attendance, leave, performance and onboarding.', icon: '👥' },
    ],
  },
  {
    key: 'finance',
    label: 'Finance',
    icon: '💰',
    color: 'from-emerald-500 to-teal-600',
    products: [
      { name: 'Beta Accounts', badge: 'ACC', desc: 'Double-entry accounting, ledgers, P&L and balance sheet reporting.', icon: '📊' },
      { name: 'Beta Payroll', badge: 'PAY', desc: 'Automated salary processing, tax computation and payslip generation.', icon: '💳' },
      { name: 'Beta Billing', badge: 'BIL', desc: 'GST-compliant invoicing, payment tracking and reconciliation.', icon: '🧾' },
      { name: 'Beta Audit', badge: 'AUD', desc: 'Financial audit trails, compliance reporting and internal controls.', icon: '🔍' },
    ],
  },
  {
    key: 'education',
    label: 'Education',
    icon: '🎓',
    color: 'from-violet-500 to-purple-600',
    products: [
      { name: 'Beta School ERP', badge: 'SCH', desc: 'Complete school administration — admissions, attendance and exams.', icon: '🏫' },
      { name: 'Beta LMS', badge: 'LMS', desc: 'Online learning platform with courses, assessments and certificates.', icon: '📚' },
      { name: 'Beta Fee Manager', badge: 'FEE', desc: 'Fee collection, receipts, reminders and financial reporting for institutions.', icon: '🏦' },
      { name: 'Beta Parent Portal', badge: 'PAR', desc: 'Real-time parent–school communication, progress tracking and alerts.', icon: '📱' },
    ],
  },
  {
    key: 'healthcare',
    label: 'Healthcare',
    icon: '🏥',
    color: 'from-rose-500 to-pink-600',
    products: [
      { name: 'Beta HMS', badge: 'HMS', desc: 'Hospital management — patient records, appointments and billing.', icon: '🏨' },
      { name: 'Beta Clinic', badge: 'CLI', desc: 'Clinic scheduling, e-prescriptions, and patient health history.', icon: '💊' },
      { name: 'Beta Lab', badge: 'LAB', desc: 'Laboratory information system with sample tracking and reports.', icon: '🔬' },
      { name: 'Beta Pharmacy', badge: 'PHA', desc: 'Medicine inventory, dispensing and supplier purchase management.', icon: '💉' },
    ],
  },
];

/* ─── Direct nav links (no dropdown) ─── */
const DIRECT_LINKS = [
  { to: '/partners', label: 'Partners' },
  { to: '/careers',  label: 'Careers'  },
  { to: '/about',    label: 'About'    },
  { to: '/support',  label: 'Support'  },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate  = useNavigate();
  const location  = useLocation();
  const isLight   = theme === THEMES.VISION;

  const [scrolled,    setScrolled]    = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [activeCategory, setActiveCategory] = useState('business');
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef  = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (profileRef.current  && !profileRef.current.contains(e.target))  setProfileOpen(false);
      if (productsRef.current && !productsRef.current.contains(e.target)) setShowProducts(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') { setShowProducts(false); setProfileOpen(false); } };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, []);

  // Close dropdown and mobile menu on route change
  useEffect(() => { setShowProducts(false); setMobileOpen(false); }, [location.pathname]);

  function handleLogout() { logout(); setProfileOpen(false); navigate('/'); }

  /* ─── Shared style tokens ─── */
  const isProductsActive = location.pathname.startsWith('/products');
  const navBg = scrolled
    ? isLight ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm'
               : 'bg-[#09091a]/95 backdrop-blur-xl border-b border-white/8 shadow-2xl shadow-black/50'
    : isLight ? 'bg-white/80 backdrop-blur-md'
               : 'bg-transparent';

  const linkCls = (active) => [
    'relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200',
    active
      ? isLight ? 'text-blue-600 bg-blue-50' : 'text-white bg-white/10'
      : isLight ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/70'
               : 'text-gray-300 hover:text-white hover:bg-white/8',
  ].join(' ');

  const activeCat = PRODUCT_CATEGORIES.find(c => c.key === activeCategory);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[62px]">

          {/* LEFT — Logo */}
          <Logo />

          {/* CENTER — Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {/* Products with dropdown */}
            <div ref={productsRef} className="relative">
              <button
                type="button"
                onMouseEnter={() => setShowProducts(true)}
                onClick={() => setShowProducts(p => !p)}
                className={`${linkCls(isProductsActive || showProducts)} inline-flex items-center gap-1.5`}
                aria-haspopup="true"
                aria-expanded={showProducts}
              >
                Products
                <motion.svg
                  animate={{ rotate: showProducts ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-3.5 h-3.5 opacity-70"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </motion.svg>
              </button>
            </div>

            {/* Direct links — no dropdown arrow */}
            {DIRECT_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) => linkCls(isActive)}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT — Search + Auth */}
          <div className="hidden lg:flex items-center gap-2">
            <SearchBar />
            {user ? (
              <div className="relative" ref={profileRef}>
                <button onClick={() => setProfileOpen(p => !p)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer
                    ${isLight ? 'bg-slate-50 border-slate-200 hover:border-blue-300' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)' }}>{user.avatar}</div>
                  <span className={`text-sm font-medium ${isLight ? 'text-slate-700' : 'text-white'}`}>{user.name}</span>
                  <svg className={`w-3 h-3 transition-transform ${profileOpen ? 'rotate-180' : ''} ${isLight ? 'text-slate-400' : 'text-gray-400'}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className={`absolute top-full right-0 mt-2 w-48 rounded-2xl overflow-hidden z-50
                        ${isLight ? 'bg-white border border-slate-200 shadow-xl' : 'bg-[#0f0f28] border border-white/10 shadow-2xl'}`}>
                      <div className={`px-4 py-3 border-b ${isLight ? 'border-slate-100' : 'border-white/8'}`}>
                        <p className={`text-sm font-semibold truncate ${isLight ? 'text-slate-800' : 'text-white'}`}>{user.name}</p>
                        <p className={`text-xs truncate ${isLight ? 'text-slate-400' : 'text-gray-500'}`}>{user.email}</p>
                      </div>
                      <div className="py-1">
                        {[{ to: '/profile', label: 'Profile' }, { to: '/dashboard', label: 'Dashboard' }].map(({ to, label }) => (
                          <Link key={to} to={to} onClick={() => setProfileOpen(false)}
                            className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors
                              ${isLight ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50' : 'text-gray-300 hover:text-white hover:bg-white/8'}`}>
                            {label}
                          </Link>
                        ))}
                      </div>
                      <div className={`border-t py-1 ${isLight ? 'border-slate-100' : 'border-white/8'}`}>
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className={`px-4 py-2 text-sm font-medium rounded-xl transition-all
                  ${isLight ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50' : 'text-gray-300 hover:text-white hover:bg-white/8'}`}>
                  Sign In
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-semibold text-white rounded-xl hover:-translate-y-0.5 transition-all"
                  style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', boxShadow: '0 4px 14px rgba(59,130,246,0.35)' }}>
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(p => !p)}
            className={`lg:hidden p-2 rounded-xl transition-all ${isLight ? 'bg-slate-100 hover:bg-slate-200' : 'bg-white/8 hover:bg-white/15'}`}
            aria-label="Toggle menu">
            <div className="w-5 h-4 flex flex-col justify-between">
              {[mobileOpen ? 'rotate-45 translate-y-1.5' : '', mobileOpen ? 'opacity-0' : 'w-full', mobileOpen ? '-rotate-45 -translate-y-2' : ''].map((cls, i) => (
                <span key={i} className={`block h-0.5 rounded-full transition-all duration-300 ${cls} ${isLight ? 'bg-slate-700' : 'bg-white'}`}/>
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* ── PRODUCTS MEGA MENU (desktop) ── */}
      <AnimatePresence>
        {showProducts && (
          <motion.div
            onMouseLeave={() => setShowProducts(false)}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`hidden lg:block absolute top-full left-0 right-0 z-40 border-b
              ${isLight ? 'bg-white border-slate-200 shadow-2xl shadow-black/8' : 'bg-[#0a0a1f] border-white/8 shadow-2xl shadow-black/60'}`}
          >
            <div className="max-w-7xl mx-auto flex" style={{ minHeight: 360 }}>
              {/* Category sidebar */}
              <div className={`w-52 flex-shrink-0 py-6 border-r ${isLight ? 'border-slate-100 bg-slate-50/60' : 'border-white/6 bg-white/2'}`}>
                <p className={`px-5 pb-3 text-[10px] font-bold tracking-[0.3em] uppercase ${isLight ? 'text-slate-400' : 'text-gray-600'}`}>
                  Categories
                </p>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <button key={cat.key} type="button"
                    onMouseEnter={() => setActiveCategory(cat.key)}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold transition-all duration-150 text-left
                      ${activeCategory === cat.key
                        ? isLight ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' : 'bg-blue-500/12 text-blue-300 border-r-2 border-blue-400'
                        : isLight ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                    <span className="text-base">{cat.icon}</span>
                    {cat.label}
                    {activeCategory === cat.key && (
                      <svg className="w-3.5 h-3.5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                      </svg>
                    )}
                  </button>
                ))}
                <div className={`mx-4 mt-4 pt-4 border-t ${isLight ? 'border-slate-200' : 'border-white/8'}`}>
                  <Link to="/products"
                    onClick={() => setShowProducts(false)}
                    className="flex items-center gap-2 text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors">
                    All Products →
                  </Link>
                </div>
              </div>

              {/* Product grid */}
              <div className="flex-1 py-6 px-6">
                <AnimatePresence mode="wait">
                  {activeCat && (
                    <motion.div key={activeCat.key}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.18 }}>
                      <p className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-4 ${isLight ? 'text-slate-400' : 'text-gray-600'}`}>
                        {activeCat.label} Solutions
                      </p>
                      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                        {activeCat.products.map((prod, i) => (
                          <motion.div key={prod.name}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}>
                            <Link to="/products"
                              onClick={() => setShowProducts(false)}
                              className={`group flex flex-col gap-3 p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg
                                ${isLight
                                  ? 'bg-white border-slate-200/80 hover:border-blue-200 hover:shadow-blue-100/50'
                                  : 'bg-white/4 border-white/8 hover:border-blue-500/30 hover:bg-white/8'}`}>
                              <div className="flex items-start justify-between">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${activeCat.color} bg-opacity-10`}
                                  style={{ background: `linear-gradient(135deg,${getGradColor(activeCat.color)})` }}>
                                  <span>{prod.icon}</span>
                                </div>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md tracking-wider
                                  ${isLight ? 'bg-slate-100 text-slate-500' : 'bg-white/10 text-gray-400'}`}>
                                  {prod.badge}
                                </span>
                              </div>
                              <div>
                                <p className={`text-sm font-bold mb-1 group-hover:text-blue-500 transition-colors ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                  {prod.name}
                                </p>
                                <p className={`text-xs leading-relaxed line-clamp-2 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                                  {prod.desc}
                                </p>
                              </div>
                              <span className={`text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0
                                ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>
                                Learn more
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                </svg>
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            className={`lg:hidden border-t overflow-hidden ${isLight ? 'bg-white border-slate-200' : 'bg-[#0a0a1f] border-white/8'}`}>
            <div className="px-4 py-4 space-y-1.5">
              {/* Products accordion */}
              <button type="button" onClick={() => setMobileProductsOpen(p => !p)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all
                  ${isLight ? 'bg-slate-50 text-slate-700 hover:bg-slate-100' : 'bg-white/6 text-gray-200 hover:bg-white/10'}`}>
                Products
                <svg className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {mobileProductsOpen && (
                <div className="pl-2 space-y-1">
                  {PRODUCT_CATEGORIES.map(cat => (
                    <div key={cat.key}>
                      <p className={`px-4 py-1.5 text-xs font-bold tracking-wider uppercase ${isLight ? 'text-slate-400' : 'text-gray-600'}`}>
                        {cat.icon} {cat.label}
                      </p>
                      {cat.products.map(prod => (
                        <Link key={prod.name} to="/products"
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all
                            ${isLight ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50' : 'text-gray-400 hover:text-white hover:bg-white/8'}`}>
                          <span>{prod.icon}</span>{prod.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Direct links */}
              {DIRECT_LINKS.map(({ to, label }) => (
                <NavLink key={to} to={to} onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `block px-4 py-3 rounded-xl text-sm font-semibold transition-all
                    ${isActive
                      ? isLight ? 'bg-blue-50 text-blue-700' : 'bg-white/10 text-white'
                      : isLight ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' : 'text-gray-300 hover:bg-white/8 hover:text-white'}`}>
                  {label}
                </NavLink>
              ))}

              <div className={`pt-3 border-t ${isLight ? 'border-slate-100' : 'border-white/8'} space-y-2`}>
                <SearchBar className="w-full"/>
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-2.5 rounded-xl text-sm ${isLight ? 'bg-slate-50 text-slate-700' : 'bg-white/5 text-gray-200'}`}>Profile</Link>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-2.5 rounded-xl text-sm ${isLight ? 'bg-slate-50 text-slate-700' : 'bg-white/5 text-gray-200'}`}>Dashboard</Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-red-500 bg-red-50/40">Sign Out</button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/login" onClick={() => setMobileOpen(false)}
                      className={`text-center px-4 py-2.5 rounded-xl text-sm font-medium ${isLight ? 'bg-slate-100 text-slate-700' : 'bg-white/8 text-white'}`}>Sign In</Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)}
                      className="text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                      style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)' }}>Register</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* Maps Tailwind gradient class → CSS stops for inline style */
function getGradColor(cls) {
  const m = {
    'from-blue-500 to-indigo-600':   'rgba(59,130,246,0.15), rgba(79,70,229,0.15)',
    'from-emerald-500 to-teal-600':  'rgba(16,185,129,0.15), rgba(13,148,136,0.15)',
    'from-violet-500 to-purple-600': 'rgba(139,92,246,0.15), rgba(147,51,234,0.15)',
    'from-rose-500 to-pink-600':     'rgba(244,63,94,0.15),  rgba(219,39,119,0.15)',
  };
  return m[cls] || 'rgba(59,130,246,0.12), rgba(139,92,246,0.12)';
}
