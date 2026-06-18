import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronDown, Search,
  Building2, TrendingUp, Users, Package,
  Banknote, Receipt, CreditCard, Wallet,
  GraduationCap, BookOpen, ClipboardList, UserSquare,
  Hospital, FileText, Calendar, Pill,
  LogOut, LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MOBILE_PRODUCTS = [
  {
    label: 'Business', color: '#1D4ED8', bg: '#DBEAFE',
    items: [
      { name: 'Beta ERP',             Icon: Building2   },
      { name: 'Beta CRM',             Icon: TrendingUp  },
      { name: 'Beta HRMS',            Icon: Users       },
      { name: 'Inventory Management', Icon: Package     },
    ],
  },
  {
    label: 'Finance', color: '#065F46', bg: '#D1FAE5',
    items: [
      { name: 'Finance Suite',       Icon: Banknote   },
      { name: 'Billing System',      Icon: Receipt    },
      { name: 'Accounting Platform', Icon: CreditCard },
      { name: 'Payment Management',  Icon: Wallet     },
    ],
  },
  {
    label: 'Education', color: '#6D28D9', bg: '#EDE9FE',
    items: [
      { name: 'School ERP',            Icon: GraduationCap },
      { name: 'Learning Platform',     Icon: BookOpen      },
      { name: 'Attendance Management', Icon: ClipboardList },
      { name: 'Student Portal',        Icon: UserSquare    },
    ],
  },
  {
    label: 'Healthcare', color: '#9F1239', bg: '#FFE4E6',
    items: [
      { name: 'Hospital Management', Icon: Hospital  },
      { name: 'Patient Records',     Icon: FileText  },
      { name: 'Appointment System',  Icon: Calendar  },
      { name: 'Pharmacy Management', Icon: Pill      },
    ],
  },
];

const DIRECT_LINKS = [
  { to: '/careers',  label: 'Careers'  },
  { to: '/partners', label: 'Partners' },
  { to: '/about',    label: 'About Us' },
  { to: '/support',  label: 'Support'  },
];

const drawer = {
  hidden:  { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] } },
  exit:    { x: '100%', opacity: 0, transition: { duration: 0.22 } },
};
const sub = {
  hidden:  { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1, transition: { duration: 0.24 } },
  exit:    { height: 0, opacity: 0, transition: { duration: 0.18 } },
};

export default function MobileMenu({ onClose }) {
  const { user, logout } = useAuth();
  const [prodOpen, setProdOpen] = useState(false);
  const [expandedCat, setExpandedCat] = useState(null);
  const [search, setSearch] = useState('');

  return (
    <motion.div
      variants={drawer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-y-0 right-0 w-full sm:w-[380px] z-[60] flex flex-col"
      style={{ backgroundColor: '#fff', boxShadow: '-8px 0 40px rgba(0,0,0,0.12)' }}
    >
      {/* Top accent */}
      <div style={{ height: 4, background: 'linear-gradient(90deg,#0052CC,#3B82F6,#06B6D4)', flexShrink: 0 }} />

      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 flex-shrink-0"
        style={{ backgroundColor: '#DCFCE7', borderBottom: '1px solid #bbf7d0' }}
      >
        <Link to="/" onClick={onClose} className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
            style={{ background: 'linear-gradient(135deg,#0052CC,#3B82F6)' }}
          >β</div>
          <span className="text-base font-black" style={{ color: '#14532D' }}>Beta Softnet</span>
        </Link>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-green-200 transition-colors"
          style={{ color: '#15803D' }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #f1f5f9' }}>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
          <Search size={15} className="text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products…"
            className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none flex-1"
          />
          {search && (
            <button onClick={() => setSearch('')}>
              <X size={13} className="text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-1">

        {/* Products accordion */}
        <div className="rounded-2xl overflow-hidden border border-slate-100">
          <button
            type="button"
            onClick={() => setProdOpen(p => !p)}
            className="w-full flex items-center justify-between px-4 py-3.5 bg-white hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs"
                style={{ background: 'linear-gradient(135deg,#0052CC,#3B82F6)' }}
              >▦</div>
              <span className="text-sm font-bold text-slate-800">Products</span>
            </div>
            <motion.div animate={{ rotate: prodOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={16} className="text-slate-400" />
            </motion.div>
          </button>

          <AnimatePresence>
            {prodOpen && (
              <motion.div
                variants={sub}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="overflow-hidden border-t border-slate-100"
                style={{ backgroundColor: '#fafafa' }}
              >
                {MOBILE_PRODUCTS.map(cat => {
                  const isOpen = expandedCat === cat.label;
                  return (
                    <div key={cat.label} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <button
                        type="button"
                        onClick={() => setExpandedCat(isOpen ? null : cat.label)}
                        className="w-full flex items-center justify-between px-5 py-3 hover:bg-white transition-colors"
                      >
                        <span className="text-xs font-bold" style={{ color: cat.color }}>{cat.label}</span>
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.18 }}>
                          <ChevronDown size={13} className="text-slate-400" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            variants={sub}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="pl-5 pr-4 pb-2 overflow-hidden"
                          >
                            {cat.items.map(({ name, Icon }) => (
                              <Link
                                key={name}
                                to="/products"
                                onClick={onClose}
                                className="flex items-center gap-2.5 py-2 pl-3 text-sm text-slate-600 hover:text-blue-700 transition-colors group"
                              >
                                <Icon size={13} className="text-slate-400 group-hover:text-blue-500 flex-shrink-0" />
                                {name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
                <div className="px-5 py-3">
                  <Link
                    to="/products"
                    onClick={onClose}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    View all products →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Direct links — blue pill on active */}
        {DIRECT_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            style={({ isActive }) =>
              isActive
                ? { display: 'block', padding: '10px 16px', borderRadius: 9999, fontSize: 14, fontWeight: 600, backgroundColor: '#3B82F6', color: '#ffffff', transition: 'all 300ms' }
                : { display: 'block', padding: '10px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: '#374151', transition: 'all 300ms' }
            }
            className="hover:bg-blue-50 hover:text-blue-700"
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer auth */}
      <div className="px-4 py-4 flex-shrink-0 space-y-2.5" style={{ borderTop: '1px solid #f1f5f9' }}>
        {user ? (
          <>
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#0052CC,#3B82F6)' }}
              >{user.avatar}</div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/dashboard"
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <LayoutDashboard size={14} /> Dashboard
              </Link>
              <button
                onClick={() => { logout(); onClose(); }}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              to="/login"
              onClick={onClose}
              className="text-center px-4 py-3 rounded-full text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={onClose}
              className="text-center px-4 py-3 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#0052CC,#0066FF)', boxShadow: '0 4px 14px rgba(0,82,204,0.35)' }}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
