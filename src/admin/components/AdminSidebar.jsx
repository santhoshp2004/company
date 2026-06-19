import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Briefcase, GraduationCap,
  Handshake, Settings, LogOut, ChevronRight,
} from 'lucide-react';
import { adminLogout } from '../adminStore';

const NAV = [
  { to: '/admin',            label: 'Dashboard',   Icon: LayoutDashboard, end: true },
  { to: '/admin/careers',    label: 'Careers',     Icon: Briefcase       },
  { to: '/admin/internships',label: 'Internships', Icon: GraduationCap   },
  { to: '/admin/partners',   label: 'Partners',    Icon: Handshake       },
  { to: '/admin/settings',   label: 'Settings',    Icon: Settings        },
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    adminLogout();
    navigate('/admin/login', { replace: true });
  }

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col"
      style={{ background: '#ffffff', borderRight: '1px solid #e5e7eb', minHeight: '100vh' }}>

      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black"
            style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)' }}>β</div>
          <div>
            <p className="text-sm font-black text-slate-900 leading-none">Beta Softnet</p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'text-white shadow-md'
                  : 'text-slate-600 hover:bg-green-50 hover:text-green-700'
              }`
            }
            style={({ isActive }) => isActive
              ? { background: 'linear-gradient(135deg,#16a34a,#15803d)', boxShadow: '0 4px 12px rgba(22,163,74,0.3)' }
              : {}
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-green-600'} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={14} className="text-white/70" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-100">
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all duration-200">
          <LogOut size={17} className="text-red-400" />
          Logout
        </button>
      </div>
    </aside>
  );
}
