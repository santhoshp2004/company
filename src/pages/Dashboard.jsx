import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';

const stats = [
  { label: 'Active Products', value: '3', icon: '📦', color: 'from-blue-500 to-cyan-500' },
  { label: 'API Calls Today',  value: '24.8K', icon: '⚡', color: 'from-purple-500 to-pink-500' },
  { label: 'Uptime',           value: '99.99%', icon: '🟢', color: 'from-green-500 to-teal-500' },
  { label: 'Team Members',     value: '12',    icon: '👥', color: 'from-orange-500 to-yellow-500' },
];

const recentActivity = [
  { icon: '🚀', text: 'NexusFlow workflow deployed successfully', time: '2m ago', type: 'success' },
  { icon: '🔔', text: 'New integration connected: Slack webhook', time: '1h ago', type: 'info' },
  { icon: '📊', text: 'Monthly analytics report generated', time: '3h ago', type: 'info' },
  { icon: '🔒', text: 'Security scan completed — no issues found', time: '5h ago', type: 'success' },
  { icon: '💳', text: 'Subscription renewed for next billing cycle', time: '1d ago', type: 'info' },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-mesh pt-24 pb-20">
      <div className="section-container">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-sm text-gray-500">Welcome back</p>
            <h1 className="text-3xl font-black text-white">
              Hey, <span className="gradient-text">{user?.name}</span> 👋
            </h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-white/10">
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">All systems operational</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon, color }) => (
            <div key={label} className="glass glass-hover rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 group">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform`}>
                {icon}
              </div>
              <p className="text-2xl font-black text-white">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Products */}
          <div className="lg:col-span-2 glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">My Products</h2>
              <Link to="/products" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">Browse all →</Link>
            </div>
            <div className="space-y-3">
              {products.slice(0, 3).map((p) => (
                <Link key={p.id} to={`/products/${p.id}`}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-200 group">
                  <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:gradient-text transition-all truncate">{p.name}</p>
                    <p className="text-xs text-gray-500 truncate">{p.tagline}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-accent-400">Active</p>
                    <p className="text-xs text-gray-500">${p.price}/mo</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h2 className="text-lg font-bold text-white mb-5">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map(({ icon, text, time, type }) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="text-base flex-shrink-0 mt-0.5">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-300 leading-relaxed">{text}</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Browse Products', icon: '📦', to: '/products', color: 'from-blue-500/20 to-cyan-500/20' },
            { label: 'Edit Profile',    icon: '👤', to: '/profile',  color: 'from-purple-500/20 to-pink-500/20' },
            { label: 'Get Support',     icon: '💬', to: '/support',  color: 'from-green-500/20 to-teal-500/20' },
            { label: 'View Careers',    icon: '🚀', to: '/careers',  color: 'from-orange-500/20 to-yellow-500/20' },
          ].map(({ label, icon, to, color }) => (
            <Link key={label} to={to}
              className={`glass glass-hover rounded-2xl p-4 text-center bg-gradient-to-br ${color} border border-white/10 transition-all duration-300 hover:-translate-y-1 group`}>
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
              <p className="text-xs font-semibold text-white">{label}</p>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
