import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Handshake, ArrowRight } from 'lucide-react';
import AdminStatCard from './components/AdminStatCard';
import { getJobs, getInternships, getPartners, getAdminSession } from './adminStore';

const QUICK_LINKS = [
  { to: '/admin/careers',     label: 'Manage Jobs',         icon: <Briefcase size={16} />,    color: '#2563eb' },
  { to: '/admin/internships', label: 'Manage Internships',  icon: <GraduationCap size={16} />,color: '#7c3aed' },
  { to: '/admin/partners',    label: 'Manage Partners',     icon: <Handshake size={16} />,    color: '#dc2626' },
];

export default function AdminDashboard() {
  const session  = getAdminSession();
  const jobs     = useMemo(getJobs,          []);
  const interns  = useMemo(getInternships,   []);
  const partners = useMemo(getPartners,      []);

  const stats = [
    { icon: '💼', label: 'Total Jobs',         value: jobs.length,     color: '#2563eb', delay: 0    },
    { icon: '🎓', label: 'Total Internships',  value: interns.length,  color: '#7c3aed', delay: 0.07 },
    { icon: '🤝', label: 'Total Partners',     value: partners.length, color: '#dc2626', delay: 0.21 },
  ];

  return (
    <div className="p-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-6 rounded-2xl border border-green-100"
        style={{ background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)' }}>
        <p className="text-xs font-bold tracking-widest uppercase text-green-600 mb-1">Welcome back</p>
        <h1 className="text-2xl font-black text-slate-900">Admin Dashboard</h1>
        <p className="text-sm text-slate-600 mt-1">
          Signed in as <span className="font-semibold text-green-700">{session?.email}</span> · {session?.role}
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <AdminStatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Quick links */}
      <h2 className="text-base font-bold text-slate-700 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {QUICK_LINKS.map(({ to, label, icon, color }, i) => (
          <motion.div key={to} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}>
            <Link to={to}
              className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: color + '15', color }}>
                  {icon}
                </div>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">{label}</span>
              </div>
              <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent entries */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Latest jobs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">Latest Jobs</h3>
            <Link to="/admin/careers" className="text-xs font-semibold text-green-600 hover:text-green-700">View all →</Link>
          </div>
          {jobs.length === 0
            ? <p className="text-xs text-slate-400 text-center py-4">No jobs yet</p>
            : jobs.slice(-5).reverse().map(j => (
              <div key={j.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{j.title}</p>
                  <p className="text-xs text-slate-400">{j.location} · {j.experience}</p>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">{j.salary || '—'}</span>
              </div>
            ))
          }
        </div>

        {/* Latest internships */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">Latest Internships</h3>
            <Link to="/admin/internships" className="text-xs font-semibold text-green-600 hover:text-green-700">View all →</Link>
          </div>
          {interns.length === 0
            ? <p className="text-xs text-slate-400 text-center py-4">No internships yet</p>
            : interns.slice(-5).reverse().map(i => (
              <div key={i.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{i.title}</p>
                  <p className="text-xs text-slate-400">{i.duration}</p>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-violet-50 text-violet-700">{i.stipend || '—'}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
