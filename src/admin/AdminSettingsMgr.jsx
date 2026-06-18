import { useState } from 'react';
import { Save, ShieldCheck, Bell, Palette, Database } from 'lucide-react';
import PageHeader from './components/PageHeader';
import { getAdminSession } from './adminStore';

const SECTIONS = [
  { key: 'account',  label: 'Account',       Icon: ShieldCheck },
  { key: 'notif',    label: 'Notifications', Icon: Bell        },
  { key: 'theme',    label: 'Appearance',    Icon: Palette     },
  { key: 'data',     label: 'Data & Export', Icon: Database    },
];

export default function AdminSettingsMgr() {
  const session = getAdminSession();
  const [active, setActive] = useState('account');
  const [saved,  setSaved]  = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const input = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all';
  const label = 'block text-xs font-semibold text-slate-600 mb-1.5';

  function exportData(key) {
    const data = localStorage.getItem(key);
    if (!data) return alert('No data found for ' + key);
    const blob = new Blob([data], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url; a.download = `${key}.json`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-8">
      <PageHeader title="Settings" subtitle="Manage portal configuration and preferences" />

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {SECTIONS.map(({ key, label: lbl, Icon }) => (
              <button key={key} type="button" onClick={() => setActive(key)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold transition-all text-left border-b border-slate-50 last:border-0 ${
                  active === key
                    ? 'text-green-700 bg-green-50'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}>
                <Icon size={16} className={active === key ? 'text-green-600' : 'text-slate-400'} />
                {lbl}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 p-6">
          {active === 'account' && (
            <form onSubmit={handleSave} className="space-y-5 max-w-lg">
              <h2 className="text-base font-bold text-slate-900 mb-4">Account Details</h2>
              <div>
                <label className={label}>Email Address</label>
                <input className={input} type="email" defaultValue={session?.email} readOnly style={{ background: '#f8fafc' }} />
              </div>
              <div>
                <label className={label}>Role</label>
                <input className={input} defaultValue={session?.role} readOnly style={{ background: '#f8fafc' }} />
              </div>
              <div>
                <label className={label}>Portal Name</label>
                <input className={input} defaultValue="Beta Softnet Admin Portal" />
              </div>
              <div>
                <label className={label}>Company</label>
                <input className={input} defaultValue="Beta Softnet Private Limited" />
              </div>
              <button type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', boxShadow: '0 4px 12px rgba(22,163,74,0.3)' }}>
                <Save size={15} />
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </form>
          )}

          {active === 'notif' && (
            <div className="max-w-lg space-y-4">
              <h2 className="text-base font-bold text-slate-900 mb-4">Notification Preferences</h2>
              {['Email me when a new job is created', 'Email me when a partner applies', 'Email me on new internship submissions'].map(lbl => (
                <label key={lbl} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-green-600 rounded" />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900">{lbl}</span>
                </label>
              ))}
            </div>
          )}

          {active === 'theme' && (
            <div className="max-w-lg space-y-5">
              <h2 className="text-base font-bold text-slate-900 mb-4">Appearance</h2>
              <div>
                <label className={label}>Portal Theme</label>
                <select className={input}>
                  <option>Light Green (Default)</option>
                  <option>Blue</option>
                  <option>Dark</option>
                </select>
              </div>
              <div>
                <label className={label}>Accent Color</label>
                <div className="flex gap-3">
                  {['#16a34a', '#2563eb', '#7c3aed', '#dc2626', '#ea580c'].map(c => (
                    <button key={c} type="button"
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                      style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {active === 'data' && (
            <div className="max-w-lg space-y-4">
              <h2 className="text-base font-bold text-slate-900 mb-4">Data & Export</h2>
              <p className="text-sm text-slate-500">Export your admin data as JSON files for backup or migration.</p>
              <div className="space-y-3">
                {[
                  { key: 'beta_admin_jobs',         label: 'Jobs Data'         },
                  { key: 'beta_admin_internships',  label: 'Internships Data'  },
                  { key: 'beta_admin_products',     label: 'Products Data'     },
                  { key: 'beta_admin_partners',     label: 'Partners Data'     },
                ].map(({ key, label: lbl }) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
                    <span className="text-sm font-semibold text-slate-700">{lbl}</span>
                    <button onClick={() => exportData(key)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-green-600 hover:bg-green-700 transition-colors">
                      Export JSON
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-xl border border-red-100 bg-red-50">
                <p className="text-sm font-bold text-red-700 mb-2">Danger Zone</p>
                <p className="text-xs text-red-500 mb-3">Clear all admin data from localStorage. This cannot be undone.</p>
                <button
                  onClick={() => { if (window.confirm('Clear ALL admin data?')) { ['beta_admin_jobs','beta_admin_internships','beta_admin_products','beta_admin_partners'].forEach(k => localStorage.removeItem(k)); window.location.reload(); } }}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors">
                  Clear All Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
