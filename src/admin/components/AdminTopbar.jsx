import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function AdminTopbar({ pageTitle, statsSummary }) {
  const { user, logout } = useAuth();
  const { toggleTheme, theme, THEMES } = useTheme();

  return (
    <div className="rounded-3xl border border-white/10 bg-dark-900/90 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary-400">Admin Workspace</p>
          <h1 className="mt-2 text-3xl font-black text-white">{pageTitle}</h1>
          <p className="mt-2 text-sm text-gray-400">Manage operations with role-based access, audit logs, and reporting.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-primary-200/40 hover:bg-white/10"
          >
            {theme === THEMES.INFINITY ? 'Dark Mode' : 'Light Mode'}
          </button>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
            {user?.name || 'Admin'} • {user?.role || 'Super Admin'}
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-500"
          >
            Sign Out
          </button>
        </div>
      </div>

      {statsSummary?.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statsSummary.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{stat.label}</p>
              <p className="mt-3 text-2xl font-bold">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500">{stat.extra}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
