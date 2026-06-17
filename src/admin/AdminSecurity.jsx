import AdminTopbar from './components/AdminTopbar';

const securityItems = [
  { label: 'JWT Authentication', status: 'Enabled' },
  { label: 'Password Encryption', status: 'Bcrypt' },
  { label: 'Audit Logs', status: 'Active' },
  { label: 'Session Management', status: 'Enabled' },
];

export default function AdminSecurity() {
  return (
    <div className="space-y-6">
      <AdminTopbar pageTitle="Security" statsSummary={[
        { label: 'Critical Events', value: '24' },
        { label: 'Active Sessions', value: '38' },
        { label: 'Password Resets', value: '9' },
      ]} />

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10">
          <h2 className="text-lg font-bold text-white mb-4">Security Controls</h2>
          <ul className="space-y-3 text-sm text-gray-300">
            {securityItems.map((item) => (
              <li key={item.label} className="rounded-3xl border border-white/10 bg-dark-800/80 p-4 flex items-center justify-between">
                <span>{item.label}</span>
                <span className="text-sm text-primary-400">{item.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10">
          <h2 className="text-lg font-bold text-white mb-4">Audit and Session Review</h2>
          <p className="text-sm text-gray-400 leading-6">Audit logs record administrator actions, login activity, role changes, and sensitive configuration updates. Session management protects active sessions from unauthorized access.</p>
          <div className="mt-6 space-y-3">
            <button className="w-full rounded-2xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-500">Download Audit Logs</button>
            <button className="w-full rounded-2xl border border-white/10 bg-dark-800/80 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10">Manage Sessions</button>
          </div>
        </div>
      </div>
    </div>
  );
}
