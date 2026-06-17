import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme, THEMES } from '../context/ThemeContext';
import Logo from './Logo';
import SearchBar from './SearchBar';

const NAV_LINKS = [
  { to: '/products', label: 'Products' },
  { to: '/careers',  label: 'Careers'  },
  { to: '/partners', label: 'Partners' },
  { to: '/about',    label: 'About'    },
  { to: '/support',  label: 'Support'  },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, t }     = useTheme();
  const navigate         = useNavigate();
  const isLight          = theme === THEMES.VISION;

  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e) => { if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  function handleLogout() { logout(); setProfileOpen(false); navigate('/'); }
  const closeMobile = () => setMobileOpen(false);

  /* ── Dynamic style tokens ── */
  const navBg = scrolled
    ? isLight
      ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
      : 'bg-dark-900/85 backdrop-blur-xl border-b border-white/8 shadow-2xl shadow-black/40'
    : 'bg-transparent';

  const linkBase    = 'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group';
  const linkActive  = isLight ? 'text-blue-600 bg-blue-50'   : 'text-white bg-white/8';
  const linkInactive= isLight ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/60' : 'text-gray-400 hover:text-white hover:bg-white/5';

  const dropdownBg  = isLight ? 'bg-white border border-slate-200 shadow-xl shadow-black/10' : 'bg-dark-800/95 border border-white/10 shadow-2xl shadow-black/50';
  const dropItemCls = isLight ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50' : 'text-gray-300 hover:text-white hover:bg-white/8';

  const mobileMenuBg = isLight ? 'bg-white/95 backdrop-blur-xl border-t border-slate-200/80' : 'bg-dark-900/95 backdrop-blur-xl border-t border-white/8';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0"><Logo /></div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
                {({ isActive }) => (
                  <>
                    {label}
                    <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300
                      ${isLight ? 'bg-gradient-to-r from-blue-500 to-violet-500' : 'bg-gradient-to-r from-primary-500 to-purple-500'}
                      ${isActive ? 'w-4/5' : 'w-0 group-hover:w-1/2'}`}/>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right: Search + Auth */}
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

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(p => !p)}
            className={`lg:hidden p-2 rounded-xl transition-all duration-200
              ${isLight ? 'bg-slate-50 border border-slate-200 hover:bg-slate-100' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden ${mobileMenuBg}`}>
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink key={to} to={to} onClick={closeMobile}
                  className={({ isActive }) => `block px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                    ${isActive
                      ? isLight ? 'text-blue-600 bg-blue-50' : 'text-white bg-white/10'
                      : isLight ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/60' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                  {label}
                </NavLink>
              ))}
              <div className={`pt-3 border-t ${isLight ? 'border-slate-100' : 'border-white/8'} space-y-2`}>
                <SearchBar className="w-full"/>
                {user ? (
                  <div className="space-y-1">
                    <Link to="/profile"   onClick={closeMobile} className={`block px-4 py-2.5 text-sm rounded-xl transition-colors ${isLight?'text-slate-600 hover:text-blue-600 hover:bg-blue-50':'text-gray-300 hover:text-white hover:bg-white/5'}`}>Profile</Link>
                    <Link to="/dashboard" onClick={closeMobile} className={`block px-4 py-2.5 text-sm rounded-xl transition-colors ${isLight?'text-slate-600 hover:text-blue-600 hover:bg-blue-50':'text-gray-300 hover:text-white hover:bg-white/5'}`}>Dashboard</Link>
                    <button onClick={() => { handleLogout(); closeMobile(); }} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors">Sign Out</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/login" onClick={closeMobile}
                      className={`flex-1 text-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all
                        ${isLight?'bg-slate-50 border border-slate-200 text-slate-700':'bg-white/5 border border-white/10 text-white'}`}>Sign In</Link>
                    <Link to="/register" onClick={closeMobile}
                      className="flex-1 text-center px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all"
                      style={{background:'linear-gradient(135deg,#3B82F6,#8B5CF6)'}}>Register</Link>
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
