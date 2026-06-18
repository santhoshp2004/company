import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail, Shield, User, Briefcase,
  Building2, TrendingUp, Users, Package,
  Banknote, Receipt, CreditCard, Wallet,
  GraduationCap, BookOpen, ClipboardList, UserSquare,
  Hospital, FileText, Calendar, Pill,
  ArrowRight,
} from 'lucide-react';
import ProductCard from './ProductCard';

/* ─── Zoho / PayPal style mega menu ─── */

const FEATURED = {
  public: [
    { Icon: Mail,    name: 'BNX MAIL',       badge: 'PUBLIC',  badgeVariant: 'public',  desc: 'Collaborative group inbox for teams of all sizes.'      },
    { Icon: Shield,  name: 'B2AUTH SECURITY', badge: 'PUBLIC',  badgeVariant: 'public',  desc: 'MFA & SSO gateway for enterprise applications.'         },
    { Icon: User,    name: 'CLIKS',           badge: 'PUBLIC',  badgeVariant: 'public',  desc: 'Notes & calendars for personal productivity.'           },
  ],
  business: [
    { Icon: Briefcase, name: 'CLIKS BUSINESS', badge: 'BUSINESS', badgeVariant: 'business', desc: 'Team project chats and collaborative workspaces.' },
  ],
};

const ALL_PRODUCTS = [
  { col: 'Business',   icon: Building2,    name: 'Beta ERP',              desc: 'Enterprise resource planning.' },
  { col: 'Business',   icon: TrendingUp,   name: 'Beta CRM',              desc: 'Customer relationship management.' },
  { col: 'Business',   icon: Users,        name: 'Beta HRMS',             desc: 'Full HR & payroll suite.' },
  { col: 'Business',   icon: Package,      name: 'Inventory Mgmt',        desc: 'Real-time stock tracking.' },
  { col: 'Finance',    icon: Banknote,     name: 'Finance Suite',         desc: 'Budgeting & financial control.' },
  { col: 'Finance',    icon: Receipt,      name: 'Billing System',        desc: 'GST-compliant invoicing.' },
  { col: 'Finance',    icon: CreditCard,   name: 'Accounting Platform',   desc: 'Ledgers, P&L, balance sheet.' },
  { col: 'Finance',    icon: Wallet,       name: 'Payment Management',    desc: 'Multi-channel payments.' },
  { col: 'Education',  icon: GraduationCap,name: 'School ERP',            desc: 'Admissions, exams, fees.' },
  { col: 'Education',  icon: BookOpen,     name: 'Learning Platform',     desc: 'Courses & certificates.' },
  { col: 'Education',  icon: ClipboardList,name: 'Attendance Mgmt',       desc: 'Biometric attendance.' },
  { col: 'Education',  icon: UserSquare,   name: 'Student Portal',        desc: 'Self-service for students.' },
  { col: 'Healthcare', icon: Hospital,     name: 'Hospital Management',   desc: 'OPD/IPD & billing.' },
  { col: 'Healthcare', icon: FileText,     name: 'Patient Records',       desc: 'Electronic medical records.' },
  { col: 'Healthcare', icon: Calendar,     name: 'Appointment System',    desc: 'Booking & scheduling.' },
  { col: 'Healthcare', icon: Pill,         name: 'Pharmacy Management',   desc: 'Medicine inventory & billing.' },
];

const COLS = ['Business', 'Finance', 'Education', 'Healthcare'];

const COL_COLOR = {
  Business:   { icon: '#1D4ED8', bg: '#DBEAFE' },
  Finance:    { icon: '#065F46', bg: '#D1FAE5' },
  Education:  { icon: '#6D28D9', bg: '#EDE9FE' },
  Healthcare: { icon: '#9F1239', bg: '#FFE4E6' },
};

/* ─── Animation ─── */
const panel = {
  hidden:  { opacity: 0, y: -14, scale: 0.98 },
  visible: { opacity: 1, y: 0,   scale: 1,    transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.16, ease: 'easeIn'  } },
};

const stagger = { visible: { transition: { staggerChildren: 0.045 } } };
const item    = { hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 0.22 } } };

export default function MegaMenu({ onClose }) {
  return (
    <motion.div
      variants={panel}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-1/2 z-50"
      style={{
        top: 'calc(100% + 12px)',
        transform: 'translateX(-50%)',
        width: 900,
        maxWidth: 'calc(100vw - 32px)',
        backgroundColor: '#ffffff',
        borderRadius: 24,
        boxShadow: '0 24px 80px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.07)',
        overflow: 'hidden',
      }}
    >
      {/* ── TOP HEADER ── */}
      <div
        className="flex items-center px-6 py-3 text-xs font-bold tracking-widest uppercase"
        style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}
      >
        {/* Left: category label */}
        <div className="w-48 flex-shrink-0">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
            style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>
            BASE
          </span>
        </div>
        {/* Center */}
        <div className="flex-1 text-center text-slate-400 text-[11px]">PUBLIC</div>
        {/* Divider */}
        <div className="w-px h-4 bg-slate-200 mx-4" />
        {/* Right */}
        <div className="w-48 text-slate-400 text-[11px]">BUSINESS</div>
      </div>

      {/* ── FEATURED PRODUCTS SECTION ── */}
      <div className="flex" style={{ borderBottom: '1px solid #E2E8F0' }}>
        {/* Left label column */}
        <div className="w-48 flex-shrink-0 p-5 flex items-start">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Featured</p>
            <p className="text-sm font-black text-slate-700 leading-tight">Beta<br/>Ecosystem</p>
          </div>
        </div>

        {/* PUBLIC column */}
        <div className="flex-1 p-4 space-y-1">
          {FEATURED.public.map(prod => (
            <ProductCard key={prod.name} {...prod} onClick={onClose} />
          ))}
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-slate-100 self-stretch my-3" />

        {/* BUSINESS column */}
        <div className="w-64 p-4 space-y-1">
          {FEATURED.business.map(prod => (
            <ProductCard key={prod.name} {...prod} onClick={onClose} />
          ))}
        </div>
      </div>

      {/* ── ALL PRODUCTS GRID ── */}
      <motion.div variants={stagger} initial="hidden" animate="visible"
        className="grid grid-cols-4 divide-x divide-slate-100 px-2 py-4">
        {COLS.map(col => {
          const cc = COL_COLOR[col];
          const prods = ALL_PRODUCTS.filter(p => p.col === col);
          return (
            <div key={col} className="px-3">
              <p className="text-[10px] font-bold tracking-widest uppercase mb-3 px-1"
                style={{ color: cc.icon }}>
                {col}
              </p>
              {prods.map(({ icon: Icon, name, desc }) => (
                <motion.div key={name} variants={item}>
                  <Link to="/products" onClick={onClose}
                    className="group flex items-center gap-2.5 px-2 py-2 rounded-xl transition-all duration-200 hover:bg-blue-50 hover:-translate-y-0.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ backgroundColor: cc.bg }}>
                      <Icon size={14} style={{ color: cc.icon }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate group-hover:text-blue-700 transition-colors">{name}</p>
                      <p className="text-[10px] text-slate-400 truncate leading-tight">{desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          );
        })}
      </motion.div>

      {/* ── FOOTER BAR ── */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ background: 'linear-gradient(135deg, #F0F9FF, #EFF6FF)', borderTop: '1px solid #E2E8F0' }}
      >
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-0.5">Beta Ecosystem</p>
          <p className="text-sm font-black text-slate-700">All Products Overview</p>
        </div>
        <Link to="/products" onClick={onClose}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #0052CC, #0066FF)',
              boxShadow: '0 4px 16px rgba(0,82,204,0.35)',
            }}
          >
            ALL PRODUCTS OVERVIEW
            <ArrowRight size={15} />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
