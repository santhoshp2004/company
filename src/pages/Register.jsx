import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Registration page — name, email, password, confirm password.
 */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Enter a valid email.';
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match.';
    return errs;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const response = await register({ name: form.name, email: form.email, password: form.password });
    if (response.success) {
      navigate('/dashboard');
    } else {
      setErrors({ email: response.error || 'Registration failed' });
      setLoading(false);
    }
  }

  // Password strength
  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-accent-400'];

  return (
    <main className="min-h-screen bg-mesh flex items-center justify-center py-20 px-4">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/50">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6,#06B6D4)' }}>
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1" strokeDasharray="28 16" strokeLinecap="round" opacity="0.5"/>
                  <path d="M 11.5 5 C 14 5,15 7,13.2 8.5 C 11.4 10,8 9.5,7 11 C 6 12.5,7.2 15,9 15"
                        stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  <circle cx="10" cy="10" r="1.8" fill="white"/>
                </svg>
              </div>
              <span className="text-lg font-bold" style={{ background:'linear-gradient(90deg,#3B82F6,#8B5CF6)', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent' }}>USEMETA</span>
            </Link>
            <h1 className="text-2xl font-black text-white mt-4 mb-1">Create your account</h1>
            <p className="text-sm text-gray-500">Start your 14-day free trial today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-1.5">Full name</label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  id="name" name="name" type="text" autoComplete="name"
                  value={form.name} onChange={handleChange}
                  placeholder="Your full name"
                  className={`input-field pl-10 ${errors.name ? 'border-red-500/60' : ''}`}
                />
              </div>
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" className="block text-xs font-medium text-gray-400 mb-1.5">Email address</label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input
                  id="reg-email" name="email" type="email" autoComplete="email"
                  value={form.email} onChange={handleChange}
                  placeholder="you@company.com"
                  className={`input-field pl-10 ${errors.email ? 'border-red-500/60' : ''}`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-password" className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  id="reg-password" name="password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.password} onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-500/60' : ''}`}
                />
                <button type="button" onClick={() => setShowPass((p) => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPass ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                  </svg>
                </button>
              </div>
              {/* Password strength bar */}
              {form.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : 'bg-white/10'}`} />
                    ))}
                  </div>
                  <p className={`text-xs ${strength <= 1 ? 'text-red-400' : strength <= 2 ? 'text-yellow-400' : strength <= 3 ? 'text-blue-400' : 'text-accent-400'}`}>
                    {strengthLabel[strength]} password
                  </p>
                </div>
              )}
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm" className="block text-xs font-medium text-gray-400 mb-1.5">Confirm password</label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <input
                  id="confirm" name="confirm"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.confirm} onChange={handleChange}
                  placeholder="Repeat your password"
                  className={`input-field pl-10 ${errors.confirm ? 'border-red-500/60' : ''}`}
                />
              </div>
              {errors.confirm && <p className="text-xs text-red-400 mt-1">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-base font-bold text-white rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-primary-900/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : 'Create Account — It\'s Free'}
            </button>

            <p className="text-[11px] text-gray-600 text-center">
              By registering you agree to our{' '}
              <Link to="/support" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/support" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>.
            </p>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
