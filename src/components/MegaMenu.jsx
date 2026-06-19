import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Mail, Shield, StickyNote, User, Briefcase,
  ArrowRight,
} from 'lucide-react';

/* ─────────────────────────────────────────
   Compact Products Dropdown
   Matches reference: 700px, 3-column header,
   PUBLIC left + BUSINESS right layout.
───────────────────────────────────────── */

const PUBLIC_PRODUCTS = [
  {
    Icon: Mail,
    name: 'BNX MAIL',
    badge: 'PUBLIC',
    desc: 'Collaborative group inbox',
    iconBg: '#EFF6FF',
    iconColor: '#3B82F6',
  },
  {
    Icon: Shield,
    name: 'B2AUTH SECURITY',
    badge: 'PUBLIC',
    desc: 'MFA & SSO Gateway',
    iconBg: '#F0FDF4',
    iconColor: '#0D9488',
  },
  {
    Icon: User,
    name: 'CLIKS',
    badge: 'PUBLIC',
    desc: 'Notes & calendars',
    iconBg: '#DCFCE7',
    iconColor: '#16A34A',
  },
];

const BUSINESS_PRODUCTS = [
  {
    Icon: Briefcase,
    name: 'CLIKS BUSINESS',
    badge: 'BUSINESS',
    desc: 'Team project chats',
    iconBg: '#F0FDF4',
    iconColor: '#0F766E',
  }
];

/* Animation */
const panel = {
  hidden: { opacity: 0, y: -10, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit:   { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.15, ease: 'easeIn' } },
};

/* ── Single product row ── */
function ProductRow({ Icon, name, badge, desc, iconBg, iconColor, isBusiness, onClose }) {
  return (
    <Link
      to="/products"
      onClick={onClose}
      className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 hover:bg-slate-50"
    >
      {/* Icon */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={15} style={{ color: iconColor }} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
            {name}
          </span>
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wider uppercase flex-shrink-0"
            style={isBusiness
              ? { background: '#F3E8FF', color: '#6B21A8' }
              : { background: '#F1F5F9', color: '#475569' }
            }
          >
            {badge}
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-tight mt-0.5 truncate">{desc}</p>
      </div>
    </Link>
  );
}

export default function MegaMenu({ onClose }) {
  return (
    <motion.div
      variants={panel}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute z-50"
      style={{
        /* Center under the Products button */
        top: 'calc(100% + 10px)',
        left: '20px',
        width: 640,
        maxWidth: 'calc(100vw - 32px)',
        backgroundColor: '#ffffff',
        borderRadius: 24,
        border: '1px solid #E2E8F0',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 6px 20px rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* ── Header row: CATEGORY | PUBLIC | BUSINESS ── */}
      <div
        className="grid text-xs font-bold tracking-widest uppercase px-5 py-3"
        style={{
          gridTemplateColumns: '100px 1fr 1fr',
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          color: '#94A3B8',
          gap: '0 24px',
        }}
      >
        <span>Category</span>
        <span>Public</span>
        <span>Business</span>
      </div>

      {/* ── Body: 3 columns ── */}
      <div
        className="grid px-4 py-4 gap-x-6 gap-y-4"
        style={{ gridTemplateColumns: '100px 1fr 1fr' }}
      >
        {/* LEFT — BASE badge */}
        <div className="flex flex-col pt-1 pl-1">
          <span
            className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase self-start"
            style={{ background: '#DCFCE7', color: '#15803D' }}
          >
            BASE
          </span>
        </div>

        {/* CENTER — PUBLIC products */}
        <div className="space-y-0.5 border-r border-slate-100 pr-4">
          {PUBLIC_PRODUCTS.map(p => (
            <ProductRow key={p.name} {...p} isBusiness={false} onClose={onClose} />
          ))}
        </div>

        {/* RIGHT — BUSINESS products */}
        <div className="space-y-0.5">
          {BUSINESS_PRODUCTS.map(p => (
            <ProductRow key={p.name} {...p} isBusiness={true} onClose={onClose} />
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderTop: '1px solid #F1F5F9', background: '#FAFAFA' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Beta Ecosystem
          </span>
        </div>
        <Link
          to="/products"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg,#3B82F6,#6366F1)',
            boxShadow: '0 3px 10px rgba(59,130,246,0.35)',
          }}
        >
          ALL PRODUCTS OVERVIEW
          <ArrowRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
}
