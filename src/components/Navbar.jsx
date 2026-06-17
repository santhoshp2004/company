import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme, THEMES } from '../context/ThemeContext';
import Logo from './Logo';
import SearchBar from './SearchBar';

/* Maps Tailwind gradient class strings → actual CSS color stops for inline style */
function gradientColors(cls) {
  const map = {
    'from-violet-500 to-purple-600':  '#8B5CF6, #9333EA',
    'from-blue-500 to-cyan-500':      '#3B82F6, #06B6D4',
    'from-emerald-500 to-teal-600':   '#10B981, #0D9488',
    'from-orange-500 to-rose-500':    '#F97316, #F43F5E',
  };
  return map[cls] || '#3B82F6, #8B5CF6';
}

const BETA_PRODUCTS = [
  {
    id: 'hr',
    name: 'BetaHR Pro',
    category: 'HR Management',
    categoryColor: 'from-violet-500 to-purple-600',
    badge: 'HR',
    desc: 'Complete employee management, attendance tracking, payroll processing, leave management, and performance evaluation system.',
    features: ['Employee Directory', 'Attendance Management', 'Leave Tracking', 'Payroll Processing'],
    stats: [{ label: 'Employees Managed', value: '1,000+' }, { label: 'Uptime', value: '99.9%' }],
    to: '/products',
    accentBg: 'bg-violet-50',
    accentText: 'text-violet-600',
    accentBorder: 'border-violet-200',
    iconBg: 'from-violet-500 to-purple-600',
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0',
  },
  {
    id: 'crm',
    name: 'BetaCRM',
    category: 'Customer Relationship Management',
    categoryColor: 'from-blue-500 to-cyan-500',
    badge: 'CRM',
    desc: 'Manage leads, sales pipelines, customer interactions, support tickets, and business growth analytics.',
    features: ['Lead Management', 'Sales Pipeline', 'Customer Support', 'Analytics Dashboard'],
    stats: [{ label: 'Businesses', value: '500+' }, { label: 'Client Retention', value: '95%' }],
    to: '/products',
    accentBg: 'bg-blue-50',
    accentText: 'text-blue-600',
    accentBorder: 'border-blue-200',
    iconBg: 'from-blue-500 to-cyan-500',
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    id: 'erp',
    name: 'BetaERP',
    category: 'Enterprise Resource Planning',
    categoryColor: 'from-emerald-500 to-teal-600',
    badge: 'ERP',
    desc: 'Integrated inventory, accounting, procurement, finance, and operational management platform.',
    features: ['Inventory Management', 'Accounting Module', 'Procurement Tracking', 'Business Reports'],
    stats: [{ label: 'Transactions', value: '10,000+' }, { label: 'Secure', value: '100%' }],
    to: '/products',
    accentBg: 'bg-emerald-50',
    accentText: 'text-emerald-600',
    accentBorder: 'border-emerald-200',
    iconBg: 'from-emerald-500 to-teal-600',
    iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    id: 'school',
    name: 'BetaSchool ERP',
    category: 'Education Management',
    categoryColor: 'from-orange-500 to-rose-500',
    badge: 'EDU',
    desc: 'Complete school administration software with student records, attendance, examinations, fees, and communication tools.',
    features: ['Student Management', 'Attendance Tracking', 'Fee Management', 'Parent Portal'],
    stats: [{ label: 'Institutions', value: '50+' }, { label: 'Students', value: '20,000+' }],
    to: '/products',
    accentBg: 'bg-orange-50',
    accentText: 'text-orange-600',
    accentBorder: 'border-orange-200',
    iconBg: 'from-orange-500 to-rose-500',
    iconPath: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
  },
];

const PARTNERS_MEGA = {
  left: {
    title: 'Work With A Partner',
    desc: 'Find certified USEMETA partners to help implement and manage products.',
    button: 'WORK WITH A PARTNER →',
    to: '/partners',
  },
  right: {
    title: 'Become A Partner',
    desc: 'Grow your business by joining the USEMETA partner ecosystem.',
    button: 'BECOME A PARTNER →',
    to: '/partners',
  },
};

const CAREERS_MENU = [
  { icon: '💼', label: 'Open Positions', to: '/careers' },
  { icon: '🏢', label: 'Company Culture', to: '/careers' },
  { icon: '🎁', label: 'Employee Benefits', to: '/careers' },
  { icon: '🎓', label: 'Internship Programs', to: '/careers' },
  { icon: '🌱', label: 'Graduate Opportunities', to: '/careers' },
];

const NAV_LINKS = [
  { key: 'about', to: '/about', label: 'About' },
  { key: 'support', to: '/support', label: 'Support' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const adminLink = user ? { key: 'admin', to: '/admin', label: 'Admin' } : null;
  const { theme, t }     = useTheme();
  const navigate         = useNavigate();
  const location         = useLocation();
  const isLight          = theme === THEMES.VISION;

  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState('');
  const [profileOpen,   setProfileOpen]   = useState(false);
  const [openMenu,      setOpenMenu]      = useState('');
  const profileRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu('');
      }
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') {
        setOpenMenu('');
        setMobileSubmenu('');
        setProfileOpen(false);
      }
      if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && document.activeElement?.getAttribute('data-menu-button')) {
        e.preventDefault();
        const menu = document.activeElement.getAttribute('data-menu-button');
        setOpenMenu(menu);
      }
    };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, []);

  function handleLogout() { logout(); setProfileOpen(false); navigate('/'); }
  const closeMobile = () => setMobileOpen(false);

  const currentPath = location.pathname;
  const activeMenu = currentPath.startsWith('/products') ? 'products'
    : currentPath.startsWith('/careers') ? 'careers'
    : currentPath.startsWith('/partners') ? 'partners'
    : currentPath.startsWith('/support') ? 'support'
    : currentPath.startsWith('/about') ? 'about'
    : '';

  const navBg = scrolled
    ? isLight
      ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
      : 'bg-dark-900/85 backdrop-blur-xl border-b border-white/8 shadow-2xl shadow-black/40'
    : 'bg-transparent';

  const buttonBase = 'inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400';
  const buttonActive = isLight ? 'text-slate-900 bg-blue-50 shadow-sm' : 'text-white bg-white/10 shadow-lg';
  const buttonInactive = isLight ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/70' : 'text-gray-300 hover:text-white hover:bg-white/10';

  const dropdownBg = isLight ? 'bg-white/95 border border-slate-200/80 shadow-2xl shadow-black/10' : 'bg-dark-800/95 border border-white/10 shadow-2xl shadow-black/50';
  const dropItemCls = isLight ? 'text-slate-700 hover:text-blue-600 hover:bg-blue-50' : 'text-gray-200 hover:text-white hover:bg-white/10';
  const cardBg = isLight ? 'bg-slate-50/90 border border-slate-200/80' : 'bg-white/5 border border-white/10';

  const mobileMenuBg = isLight ? 'bg-white/95 backdrop-blur-xl border-t border-slate-200/80' : 'bg-dark-900/95 backdrop-blur-xl border-t border-white/8';

  const navButton = (key, label) => (
    <button
      type="button"
      data-menu-button={key}
      onClick={() => setOpenMenu(openMenu === key ? '' : key)}
      onMouseEnter={() => setOpenMenu(key)}
      onFocus={() => setOpenMenu(key)}
      className={`${buttonBase} ${activeMenu === key || openMenu === key ? buttonActive : buttonInactive}`}
      aria-haspopup="true"
      aria-expanded={openMenu === key}
      aria-controls={`${key}-panel`}
    >
      {label}
      <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${openMenu === key ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-8">
            <div className="flex-shrink-0"><Logo /></div>
            <div ref={navRef} className="hidden lg:flex items-center gap-0.5 relative" onMouseLeave={() => setOpenMenu('')}>
              {navButton('products', 'Products')}
              {navButton('partners', 'Partners')}
              {navButton('careers', 'Careers')}
              {adminLink ? (
                <NavLink key={adminLink.key} to={adminLink.to}
                  className={({ isActive }) => `${buttonBase} ${isActive ? buttonActive : buttonInactive}`}
                >
                  {adminLink.label}
                </NavLink>
              ) : null}
              {NAV_LINKS.map(({ key, to, label }) => (
                <NavLink key={key} to={to}
                  className={({ isActive }) => `${buttonBase} ${isActive ? buttonActive : buttonInactive}`}
                >
                  {label}
                </NavLink>
              ))}

              <AnimatePresence>
                {openMenu === 'products' && (
                  <motion.div
                    key="products-panel"
                    id="products-panel"
                    initial={{ opacity: 0, y: -12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50 w-[min(1100px,96vw)]"
                    style={{
                      background: isLight
                        ? 'rgba(255,255,255,0.97)'
                        : 'rgba(13,10,35,0.96)',
                      backdropFilter: 'blur(24px)',
                      border: isLight ? '1px solid rgba(226,232,240,0.9)' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 28,
                      boxShadow: isLight
                        ? '0 32px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(59,130,246,0.08)'
                        : '0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(59,130,246,0.15)',
                    }}
                  >
                    {/* Header */}
                    <div className="px-7 pt-6 pb-4 flex items-center justify-between border-b"
                      style={{ borderColor: isLight ? 'rgba(226,232,240,0.7)' : 'rgba(255,255,255,0.07)' }}>
                      <div>
                        <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-1"
                          style={{ color: '#3B82F6' }}>Our Products</p>
                        <h3 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          Purpose-built software for every team
                        </h3>
                      </div>
                      <Link to="/products"
                        className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                        style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', color: 'white', boxShadow: '0 4px 14px rgba(59,130,246,0.35)' }}>
                        View All Products
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </Link>
                    </div>

                    {/* 4-card grid */}
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-0">
                      {BETA_PRODUCTS.map((product, i) => (
                        <motion.div key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.2 }}
                        >
                          <Link to={product.to}
                            className="group block p-5 transition-all duration-200 relative overflow-hidden h-full"
                            style={{
                              borderRight: i < 3 ? (isLight ? '1px solid rgba(226,232,240,0.6)' : '1px solid rgba(255,255,255,0.06)') : 'none',
                            }}>
                            {/* Hover bg */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ background: isLight ? 'rgba(59,130,246,0.04)' : 'rgba(59,130,246,0.07)' }}/>

                            <div className="relative z-10 flex flex-col gap-3.5">
                              {/* Icon + Badge row */}
                              <div className="flex items-start justify-between">
                                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110"
                                  style={{ background: `linear-gradient(135deg,${gradientColors(product.iconBg)})` }}>
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d={product.iconPath}/>
                                  </svg>
                                </div>
                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-lg border tracking-wider ${isLight ? `${product.accentBg} ${product.accentText} ${product.accentBorder}` : 'bg-white/10 text-white/70 border-white/15'}`}>
                                  {product.badge}
                                </span>
                              </div>

                              {/* Name & category */}
                              <div>
                                <h4 className={`text-base font-bold mb-0.5 transition-colors duration-200 group-hover:text-blue-500 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                  {product.name}
                                </h4>
                                <p className={`text-[11px] font-semibold tracking-wide ${product.accentText}`}>
                                  {product.category}
                                </p>
                              </div>

                              {/* Description */}
                              <p className={`text-xs leading-relaxed line-clamp-2 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                                {product.desc}
                              </p>

                              {/* Features */}
                              <ul className="space-y-1.5">
                                {product.features.map((feat) => (
                                  <li key={feat} className="flex items-center gap-2">
                                    <svg className="w-3 h-3 flex-shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                    </svg>
                                    <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>{feat}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* Stats */}
                              <div className="pt-3 mt-auto grid grid-cols-2 gap-2 border-t"
                                style={{ borderColor: isLight ? 'rgba(226,232,240,0.6)' : 'rgba(255,255,255,0.08)' }}>
                                {product.stats.map(({ label, value }) => (
                                  <div key={label} className={`rounded-xl p-2 text-center ${isLight ? 'bg-slate-50 border border-slate-100' : 'bg-white/5 border border-white/8'}`}>
                                    <p className={`text-sm font-black ${product.accentText}`}>{value}</p>
                                    <p className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-400' : 'text-gray-500'}`}>{label}</p>
                                  </div>
                                ))}
                              </div>

                              {/* CTA arrow */}
                              <div className={`flex items-center gap-1 text-xs font-semibold transition-all duration-200 ${product.accentText} opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0`}>
                                Explore {product.name}
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                </svg>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer bar */}
                    <div className="px-7 py-3.5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t"
                      style={{ borderColor: isLight ? 'rgba(226,232,240,0.7)' : 'rgba(255,255,255,0.07)' }}>
                      <p className={`text-xs ${isLight ? 'text-slate-400' : 'text-gray-500'}`}>
                        All products by <span className={`font-semibold ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>USEMETA</span> · Founded by Santhosh
                      </p>
                      <div className="flex items-center gap-1.5 ml-auto">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>
                        <span className={`text-xs ${isLight ? 'text-slate-400' : 'text-gray-500'}`}>All systems operational</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {openMenu === 'partners' && (
                  <motion.div
                    key="partners-panel"
                    id="partners-panel"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className={`absolute left-0 right-0 top-full mt-3 px-4 z-40 ${dropdownBg} rounded-[28px] backdrop-blur-xl`}
                  >
                    <div className="max-w-7xl mx-auto py-6 grid gap-5 lg:grid-cols-2">
                      {[PARTNERS_MEGA.left, PARTNERS_MEGA.right].map((item) => (
                        <div key={item.title} className={`${cardBg} rounded-3xl p-8 flex flex-col justify-between min-h-[240px]`}>
                          <div>
                            <p className="text-xs uppercase tracking-[0.28em] text-primary-500 mb-4">Partner network</p>
                            <h4 className={`text-2xl font-black mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.title}</h4>
                            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>{item.desc}</p>
                          </div>
                          <Link to={item.to}
                            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-primary-600 hover:text-primary-700">
                            {item.button}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {openMenu === 'careers' && (
                  <motion.div
                    key="careers-panel"
                    id="careers-panel"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className={`absolute left-0 right-0 top-full mt-3 px-4 z-40 ${dropdownBg} rounded-[28px] backdrop-blur-xl`}
                  >
                    <div className="max-w-7xl mx-auto py-6 px-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {CAREERS_MENU.map((item) => (
                        <Link key={item.label} to={item.to}
                          className={`group ${cardBg} rounded-3xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10`}>
                          <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4 bg-slate-900/10 text-lg">
                            {item.icon}
                          </div>
                          <p className={`text-sm font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.label}</p>
                          <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>Explore career paths and benefits at USEMETA.</p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <SearchBar />

            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(p => !p)}
                  aria-haspopup="true" aria-expanded={profileOpen}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl cursor-pointer transition-all duration-300
                    ${isLight ? 'bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50' : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'}`}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)' }}>
                    {user.avatar}
                  </div>
                  <span className={`text-sm font-medium max-w-[100px] truncate ${isLight ? 'text-slate-700' : 'text-white'}`}>{user.name}</span>
                  <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''} ${isLight ? 'text-slate-400' : 'text-gray-400'}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full right-0 mt-2 w-52 rounded-2xl overflow-hidden z-50 ${dropdownBg}`}>
                      <div className={`px-4 py-3 border-b ${isLight ? 'border-slate-100' : 'border-white/8'}`}>
                        <p className={`text-sm font-semibold truncate ${isLight ? 'text-slate-800' : 'text-white'}`}>{user.name}</p>
                        <p className={`text-xs truncate ${isLight ? 'text-slate-400' : 'text-gray-500'}`}>{user.email}</p>
                      </div>
                      <div className="py-1">
                        <DdItem to="/profile"   icon="user" label="Profile"   cls={dropItemCls} onClick={() => setProfileOpen(false)} />
                        <DdItem to="/dashboard" icon="grid" label="Dashboard" cls={dropItemCls} onClick={() => setProfileOpen(false)} />
                      </div>
                      <div className={`border-t ${isLight ? 'border-slate-100' : 'border-white/8'} py-1`}>
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login"
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200
                    ${isLight ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>
                  Sign In
                </Link>
                <Link to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', boxShadow: '0 4px 14px rgba(59,130,246,0.35)' }}>
                  Register
                </Link>
              </div>
            )}
          </div>

          <button onClick={() => setMobileOpen(p => !p)}
            className={`lg:hidden p-2 rounded-xl transition-all duration-200 ${isLight ? 'bg-slate-50 border border-slate-200 hover:bg-slate-100' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
            aria-label="Toggle menu">
            <div className="w-5 h-4 flex flex-col justify-between">
              {[
                mobileOpen ? 'rotate-45 translate-y-1.5' : '',
                mobileOpen ? 'opacity-0 w-0' : 'w-full',
                mobileOpen ? '-rotate-45 -translate-y-2' : '',
              ].map((cls, i) => (
                <span key={i} className={`block h-0.5 rounded-full transition-all duration-300 ${cls} ${isLight ? 'bg-slate-700' : 'bg-white'}`}/>
              ))}
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden ${mobileMenuBg}`}>
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {[
                { key: 'products', label: 'Products', items: BETA_PRODUCTS.map(p => ({ ...p, title: p.name, label: p.name, icon: p.badge })) },
                { key: 'partners', label: 'Partners', mega: [PARTNERS_MEGA.left, PARTNERS_MEGA.right] },
                { key: 'careers', label: 'Careers', items: CAREERS_MENU },
              ].map((group) => (
                <div key={group.key} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setMobileSubmenu(mobileSubmenu === group.key ? '' : group.key)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold rounded-2xl ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-white/10 text-white'} transition duration-200 hover:bg-blue-500/10`}
                    aria-expanded={mobileSubmenu === group.key}
                  >
                    {group.label}
                    <svg className={`w-4 h-4 transition-transform duration-200 ${mobileSubmenu === group.key ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  {mobileSubmenu === group.key && (
                    <div className="space-y-2 px-4">
                      {group.items?.map((item) => (
                        <Link key={item.title || item.label} to={item.to}
                          onClick={closeMobile}
                          className={`block rounded-2xl px-4 py-3 text-sm transition duration-200 ${isLight ? 'bg-white/70 text-slate-900 hover:bg-blue-50' : 'bg-white/5 text-gray-200 hover:bg-white/10'}`}>
                          <span className="inline-flex items-center gap-2">
                            <span className="w-8 h-8 rounded-2xl inline-flex items-center justify-center bg-blue-600 text-white shadow-sm shadow-blue-500/20">{item.icon}</span>
                            {item.title || item.label}
                          </span>
                        </Link>
                      ))}
                      {group.mega?.map((item) => (
                        <Link key={item.title} to={item.to}
                          onClick={closeMobile}
                          className={`block rounded-3xl px-4 py-5 ${cardBg} transition duration-200 hover:-translate-y-0.5`}>
                          <p className="text-xs uppercase tracking-[0.28em] text-primary-500 mb-2">Partner network</p>
                          <p className="text-lg font-semibold mb-2">{item.title}</p>
                          <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>{item.desc}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className={`pt-4 border-t ${isLight ? 'border-slate-100' : 'border-white/10'} space-y-1`}>
                {NAV_LINKS.map(({ to, label }) => (
                  <NavLink key={to} to={to} onClick={closeMobile}
                    className={({ isActive }) => `block px-4 py-3 text-sm font-medium rounded-2xl transition duration-200 ${isActive ? (isLight ? 'bg-blue-50 text-blue-600' : 'bg-white/10 text-white') : (isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-gray-300 hover:bg-white/10')}`}>
                    {label}
                  </NavLink>
                ))}
                <SearchBar className="w-full" />
                {user ? (
                  <>
                    <Link to="/profile" onClick={closeMobile} className={`block px-4 py-3 rounded-2xl ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-white/5 text-white'}`}>Profile</Link>
                    <Link to="/dashboard" onClick={closeMobile} className={`block px-4 py-3 rounded-2xl ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-white/5 text-white'}`}>Dashboard</Link>
                    <button onClick={() => { handleLogout(); closeMobile(); }} className="w-full text-left px-4 py-3 rounded-2xl text-red-500 bg-red-50/40">Sign Out</button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/login" onClick={closeMobile}
                      className={`block text-center px-4 py-3 rounded-2xl ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-white/5 text-white'}`}>Sign In</Link>
                    <Link to="/register" onClick={closeMobile}
                      className="block text-center px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/20">Register</Link>
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

function DdItem({ to, icon, label, cls, onClick }) {
  const paths = {
    user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    grid: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  };
  return (
    <Link to={to} onClick={onClick} className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${cls}`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={paths[icon]}/>
      </svg>
      {label}
    </Link>
  );
}
