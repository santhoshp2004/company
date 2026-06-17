import { NavLink } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'Overview', icon: '📊' },
  { to: '/admin/products', label: 'Products', icon: '📦' },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden xl:block xl:w-80 2xl:w-96 shrink-0">
      <div className="sticky top-24 overflow-hidden rounded-3xl border border-white/10 bg-dark-900/90 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-primary-400 mb-3">Beta Softnet</p>
          <h2 className="text-2xl font-extrabold text-white">Admin Console</h2>
          <p className="mt-3 text-sm text-gray-400 leading-6">Manage products and view analytics.</p>
        </div>

        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive ? 'bg-primary-600/15 text-white shadow-lg shadow-primary-900/20' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
