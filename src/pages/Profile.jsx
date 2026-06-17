import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    updateUser({ name: form.name, email: form.email, avatar: form.name.charAt(0).toUpperCase() });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <main className="min-h-screen bg-mesh pt-24 pb-20">
      <div className="section-container max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your account settings and preferences.</p>
        </div>

        {saved && (
          <div className="mb-4 p-3 bg-accent-500/10 border border-accent-500/30 rounded-xl text-sm text-accent-400 flex items-center gap-2">
            ✓ Profile updated successfully
          </div>
        )}

        {/* Avatar card */}
        <div className="glass rounded-2xl p-6 border border-white/10 mb-5">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-3xl font-black text-white flex-shrink-0">
              {user?.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user?.name}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-1 text-xs font-semibold bg-primary-500/15 text-primary-400 border border-primary-500/30 rounded-full">{user?.plan} Plan</span>
                <span className="text-xs text-gray-600">Member since {user?.joinedAt}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit form */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-white">Account Details</h3>
            {!editing && (
              <button onClick={() => setEditing(true)} className="text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors">
                Edit →
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
              <input
                type="text" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={!editing}
                className="input-field disabled:opacity-60 disabled:cursor-default"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
              <input
                type="email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={!editing}
                className="input-field disabled:opacity-60 disabled:cursor-default"
              />
            </div>

            {editing && (
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary text-sm">Save Changes</button>
                <button type="button" onClick={() => setEditing(false)} className="btn-secondary text-sm">Cancel</button>
              </div>
            )}
          </form>
        </div>

        {/* Danger zone */}
        <div className="mt-5 glass rounded-2xl p-6 border border-red-500/20">
          <h3 className="text-base font-bold text-white mb-1">Sign Out</h3>
          <p className="text-xs text-gray-500 mb-4">You will be signed out of your current session.</p>
          <button onClick={logout} className="btn-danger text-sm">Sign Out</button>
        </div>
      </div>
    </main>
  );
}
