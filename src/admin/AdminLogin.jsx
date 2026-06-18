import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Copy, Check,
         LayoutDashboard, Briefcase, GraduationCap, Package, Handshake } from 'lucide-react';
import { adminLogin } from './adminStore';

/* ── Clickable credential row with copy-to-clipboard ── */
function CredRow({ label, value, onFill }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
    onFill && onFill(value);
  }

  return (
    <div
      onClick={handleCopy}
      className="group flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/20"
    >
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-green-300 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-mono font-semibold text-white truncate">{value}</p>
      </div>
      <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-green-300 group-hover:bg-white/20 transition-colors">
        {copied ? <Check size={12} className="text-green-200" /> : <Copy size={11} />}
      </div>
    </div>
  );
}

const PORTAL_SECTIONS = [
  { Icon: LayoutDashboard, label: 'Dashboard',   desc: 'Stats & overview'        },
  { Icon: Briefcase,       label: 'Careers',      desc: 'Job listings CRUD'       },
  { Icon: GraduationCap,   label: 'Internships',  desc: 'Internship CRUD'         },
  { Icon: Package,         label: 'Products',     desc: 'Product catalogue CRUD'  },
  { Icon: Handshake,       label: 'Partners',     desc: 'Partner management CRUD' },
];

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form,      setForm]     = useState({ email: '', password: '' });
  const [showPass,  setShowPass] = useState(false);
  const [error,     setError]    = useState('');
  const [loading,   setLoading]  = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = adminLogin(form.email, form.password);
    setLoading(false);
    if (result.success) navigate('/admin', { replace: true });
    else setError(result.error);
  }

  /* Auto-fill credentials into form when copied */
  function fillEmail(v)    { setForm(f => ({ ...f, email: v })); }
  function fillPassword(v) { setForm(f => ({ ...f, password: v })); }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: 'linear-gradient(135deg,#f0fdf4 0%,#dcfce7 50%,#bbf7d0 100%)' }}
    >
      {/* Background blobs */}
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#22c55e,transparent)' }} />
      <div className="fixed bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#16a34a,transparent)' }} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-4xl relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-start"
      >

        {/* ══════════════════════════════════
            LEFT — Admin credentials panel
        ══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="rounded-3xl p-6 flex flex-col gap-5"
          style={{
            background: 'linear-gradient(145deg,#15803d,#166534)',
            boxShadow: '0 24px 60px rgba(22,163,74,0.35)',
          }}
        >
          {/* Logo & title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
              <ShieldCheck size={22} className="text-white" />
            </div>
            <div>
              <p className="text-base font-black text-white leading-tight">Beta Softnet</p>
              <p className="text-xs text-green-300 font-medium">Admin Portal · Credentials</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/15" />

          {/* Login credentials */}
          <div>
            <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-2 px-1">
              Login Credentials
            </p>
            <div className="bg-white/10 rounded-2xl overflow-hidden divide-y divide-white/10">
              <CredRow
                label="Email Address"
                value="admin@betasoftnet.com"
                onFill={fillEmail}
              />
              <CredRow
                label="Password"
                value="Admin@123"
                onFill={fillPassword}
              />
            </div>
            <p className="text-[10px] text-green-400/70 mt-2 px-1">
              Click any row to copy &amp; auto-fill
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/15" />

          {/* Portal sections */}
          <div>
            <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-3 px-1">
              What's Inside
            </p>
            <div className="space-y-1.5">
              {PORTAL_SECTIONS.map(({ Icon, label, desc }) => (
                <div key={label} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/8 hover:bg-white/15 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-green-200" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-none">{label}</p>
                    <p className="text-[10px] text-green-300/80 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-auto pt-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <p className="text-[10px] text-green-400">Frontend-only · localStorage · No backend required</p>
          </div>
        </motion.div>

        {/* ══════════════════════════════════
            RIGHT — Sign In card
        ══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-green-200/50 border border-green-100">

            {/* Header */}
            <div className="text-center mb-7">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)' }}
              >
                <ShieldCheck size={26} className="text-white" />
              </div>
              <h1 className="text-2xl font-black text-slate-900">Sign In</h1>
              <p className="text-sm text-slate-500 mt-1">Beta Softnet Admin Portal</p>
            </div>

            {/* Error banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-4 px-4 py-3 rounded-xl text-sm font-medium bg-red-50 text-red-600 border border-red-200"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="admin@betasoftnet.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all mt-2"
                style={{
                  background: 'linear-gradient(135deg,#16a34a,#15803d)',
                  boxShadow: '0 4px 16px rgba(22,163,74,0.35)',
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  'Sign In to Admin Portal'
                )}
              </motion.button>
            </form>

            {/* Quick-fill buttons */}
            <div
              className="mt-5 p-3 rounded-2xl border border-green-100"
              style={{ background: '#f0fdf4' }}
            >
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-2 text-center">
                Quick Fill Demo Credentials
              </p>
              <button
                type="button"
                onClick={() => setForm({ email: 'admin@betasoftnet.com', password: 'Admin@123' })}
                className="w-full py-2 rounded-xl text-xs font-bold text-green-700 bg-white border border-green-200 hover:bg-green-50 hover:border-green-400 transition-all"
              >
                ⚡ Fill admin@betasoftnet.com / Admin@123
              </button>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
