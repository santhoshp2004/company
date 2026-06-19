import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ChevronDown, ChevronUp, Menu, X,
  LogOut, LayoutDashboard, User, Shield,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme, THEMES } from '../context/ThemeContext';
import Logo from './Logo';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';

/* ─── Design tokens ─── */
const NAV_BG       = '#DCFCE7';   // light green header
const NAV_BORDER   = '#bbf7d0';   // green-200
const SCROLL_BG    = '#ffffff';   // white after scroll
const PILL_BG      = '#3B82F6';   // active blue pill
const PILL_TEXT    = '#ffffff';   // active pill text
const DARK_TEXT    = '#14532D';   // green-900 text on green bg
const IDLE_TEXT    = '#374151';   // slate-700 on white bg

/* ─── Nav order: Products ▼ · Careers · Partners · About · Support ─── */
const DIRECT_LINKS = [
  { to: '/careers',  label: 'Careers'  },
  { to: '/partners', label: 'Partners' },
  { to: '/about',    label: 'About Us' },
  { to: '/support',  label: 'Support'  },
];

export default function Navbar() {
  const { user, logout }   = useAuth();
  const navigate           = useNavigate();
  const location           = useLocation();

  const [scrolled,     setScrolled]    = useState(false);
  const [megaOpen,     setMegaOpen]    = useState(false);
  const [mobileOpen,   setMobileOpen]  = useState(false);
  const [profileOpen,  setProfileOpen] = useState(false);
  const [searchActive, setSearchActive]= useState(false);
  const [searchVal,    setSearchVal]   = useState('');

  const megaWrapRef = useRef(null);
  const profileRef  = useRef(null);
  const searchRef   = useRef(null);

  /* scroll shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* outside click */
  useEffect(() => {
    const fn = (e) => {
      if (megaWrapRef.current  && !megaWrapRef.current.contains(e.target))  setMegaOpen(false);
      if (profileRef.current   && !profileRef.current.contains(e.target))   setProfileOpen(false);
      if (searchRef.current    && !searchRef.current.contains(e.target))     setSearchActive(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  /* Escape */
  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') {
        setMegaOpen(false); setProfileOpen(false);
        setSearchActive(false); setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, []);

  /* route change → close all */
  useEffect(() => {
    setMegaOpen(false); setMobileOpen(false);
    setProfileOpen(false); setSearchActive(false);
  }, [location.pathname]);

  /* body scroll lock */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLogout = useCallback(() => {
    logout(); setProfileOpen(false); navigate('/');
  }, [logout, navigate]);

  const isProductsActive = location.pathname.startsWith('/products');

  /* ── Computed styles ── */
  const headerBg     = scrolled ? SCROLL_BG : NAV_BG;
  const headerBorder = scrolled ? '#e5e7eb' : NAV_BORDER;
  const headerShadow = scrolled
    ? '0 2px 20px rgba(0,0,0,0.08)'
    : '0 2px 10px rgba(22,163,74,0.12)';
  const baseText = scrolled ? IDLE_TEXT : DARK_TEXT;

  /* ── Active pill (blue) vs idle link style ── */
  const pillStyle = {
    backgroundColor: PILL_BG,
    color: PILL_TEXT,
    borderRadius: 9999,
    padding: '8px 16px',
    fontWeight: 700,
    fontSize: 14,
    transition: 'all 300ms',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  };
  const idleStyle = (hovered) => ({
    backgroundColor: hovered ? 'rgba(59,130,246,0.08)' : 'transparent',
    color: baseText,
    borderRadius: 9999,
    padding: '8px 16px',
    fontWeight: 600,
    fontSize: 14,
    transition: 'all 300ms',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  });

  return (
    <>
      {/* ════════════════════════
          HEADER
      ════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: headerBg,
          borderBottom: `1px solid ${headerBorder}`,
          boxShadow: headerShadow,
          height: 80,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center gap-4">

          {/* Logo */}
          <div className="flex-shrink-0 mr-2">
            <Logo />
          </div>

          {/* ── Centered pill nav container ── */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div
              className="flex items-center gap-1 px-3 py-2"
              style={{
                backgroundColor: scrolled ? '#F3F4F6' : 'rgba(255,255,255,0.55)',
                borderRadius: 50,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: scrolled ? '1px solid #e5e7eb' : '1px solid rgba(255,255,255,0.7)',
              }}
            >
              {/* ── Products button — dropdown centers relative to THIS div ── */}
              <div ref={megaWrapRef} className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setMegaOpen(true)}
                  onClick={() => setMegaOpen(p => !p)}
                  aria-haspopup="true"
                  aria-expanded={megaOpen}
                  style={isProductsActive || megaOpen ? pillStyle : idleStyle(megaOpen)}
                >
                  Products
                  {megaOpen
                    ? <ChevronUp size={14} className="flex-shrink-0" />
                    : <ChevronDown size={14} className="flex-shrink-0" />
                  }
                </button>

                {/* Compact centered dropdown — lives inside the relative wrapper */}
                <AnimatePresence>
                  {megaOpen && (
                    <div
                      onMouseEnter={() => setMegaOpen(true)}
                      onMouseLeave={() => setMegaOpen(false)}
                      className="hidden lg:block"
                    >
                      <MegaMenu onClose={() => setMegaOpen(false)} />
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Direct links — blue pill when active */}
              {DIRECT_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  style={({ isActive }) => isActive ? pillStyle : idleStyle(false)}
                  className="whitespace-nowrap"
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ── Right: search + auth ── */}
          <div className="hidden lg:flex items-center gap-2.5 ml-2">

            {/* Expandable search */}
            <div ref={searchRef} className="relative">
              <AnimatePresence mode="wait">
                {searchActive ? (
                  <motion.div
                    key="open"
                    initial={{ width: 38, opacity: 0.4 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 38, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="flex items-center gap-2 px-3 py-2 rounded-full border bg-white"
                    style={{ borderColor: '#3B82F6', boxShadow: '0 0 0 3px rgba(59,130,246,0.12)' }}
                  >
                    <Search size={15} className="text-blue-500 flex-shrink-0" />
                    <input
                      autoFocus
                      type="text"
                      value={searchVal}
                      onChange={e => setSearchVal(e.target.value)}
                      placeholder="Search products…"
                      className="text-sm text-slate-700 placeholder-slate-400 outline-none bg-transparent flex-1"
                    />
                    {searchVal && (
                      <button onClick={() => setSearchVal('')}>
                        <X size={13} className="text-slate-400 hover:text-slate-600" />
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.button
                    key="closed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSearchActive(true)}
                    aria-label="Search"
                    className="w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 hover:bg-blue-50 hover:border-blue-300"
                    style={{
                      borderColor: scrolled ? '#e5e7eb' : NAV_BORDER,
                      backgroundColor: scrolled ? '#fff' : 'rgba(255,255,255,0.5)',
                      color: scrolled ? '#6b7280' : '#15803D',
                    }}
                  >
                    <Search size={16} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Profile or Sign In */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(p => !p)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all duration-200 hover:shadow-md"
                  style={{
                    borderColor: scrolled ? '#e5e7eb' : NAV_BORDER,
                    backgroundColor: scrolled ? '#fff' : 'rgba(255,255,255,0.6)',
                    color: baseText,
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#0052CC,#3B82F6)' }}
                  >{user.avatar}</div>
                  <span className="text-sm font-semibold max-w-[90px] truncate">{user.name}</span>
                  <motion.div animate={{ rotate: profileOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={13} className="opacity-60" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full right-0 mt-2 w-52 rounded-2xl overflow-hidden z-50"
                      style={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
                      }}
                    >
                      <div className="px-4 py-3" style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      </div>
                      <div className="py-1.5">
                        {[
                          { to: '/profile',   Icon: User,             label: 'Profile'   },
                          { to: '/dashboard', Icon: LayoutDashboard,  label: 'Dashboard' },
                        ].map(({ to, Icon, label }) => (
                          <Link key={to} to={to} onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors">
                            <Icon size={14} className="text-slate-400" /> {label}
                          </Link>
                        ))}
                      </div>
                      <div className="py-1.5" style={{ borderTop: '1px solid #f3f4f6' }}>
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                          <LogOut size={14} /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Admin Login button */}
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg,#1e3a5f,#1d4ed8)',
                    boxShadow: '0 4px 14px rgba(29,78,216,0.35)',
                  }}
                  title="Admin Portal"
                >
                  <Shield size={14} className="flex-shrink-0" />
                  Admin Login
                </Link>

                {/* User Sign In button */}
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg,#0052CC,#0066FF)',
                    color: '#fff',
                    boxShadow: '0 4px 14px rgba(0,82,204,0.32)',
                  }}
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile buttons ── */}
          <div className="flex lg:hidden items-center gap-2 ml-auto">
            <button
              onClick={() => setSearchActive(p => !p)}
              aria-label="Search"
              className="w-9 h-9 flex items-center justify-center rounded-full border transition-colors hover:bg-green-100"
              style={{ borderColor: NAV_BORDER, color: '#15803D', backgroundColor: 'rgba(255,255,255,0.5)' }}
            >
              <Search size={16} />
            </button>
            <button
              onClick={() => setMobileOpen(p => !p)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="w-9 h-9 flex items-center justify-center rounded-full border transition-colors hover:bg-green-100"
              style={{ borderColor: NAV_BORDER, color: '#15803D', backgroundColor: 'rgba(255,255,255,0.5)' }}
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={18} /></motion.div>
                  : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <AnimatePresence>
          {searchActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="lg:hidden overflow-hidden"
              style={{ backgroundColor: '#fff', borderTop: `1px solid ${NAV_BORDER}` }}
            >
              <div className="px-4 py-3">
                <div
                  className="flex items-center gap-2 px-3 py-2.5 rounded-full border"
                  style={{ backgroundColor: '#F0FDF4', borderColor: '#bbf7d0' }}
                >
                  <Search size={15} style={{ color: '#16A34A' }} className="flex-shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={searchVal}
                    onChange={e => setSearchVal(e.target.value)}
                    placeholder="Search products…"
                    className="text-sm text-slate-700 placeholder-slate-400 outline-none bg-transparent flex-1"
                  />
                  {searchVal && (
                    <button onClick={() => setSearchVal('')}>
                      <X size={13} className="text-slate-400" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile drawer + backdrop ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-[55] bg-black/40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <div className="lg:hidden">
              <MobileMenu onClose={() => setMobileOpen(false)} />
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
