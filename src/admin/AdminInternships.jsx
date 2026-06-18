import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from './components/PageHeader';
import CrudTable  from './components/CrudTable';
import Modal      from './components/Modal';
import AdminStatCard from './components/AdminStatCard';
import { getInternships, createInternship, updateInternship, deleteInternship } from './adminStore';

const EMPTY = { title: '', duration: '', stipend: '', skills: '', description: '' };

const COLUMNS = [
  { key: 'title',       label: 'Title'    },
  { key: 'duration',    label: 'Duration' },
  { key: 'stipend',     label: 'Stipend'  },
  { key: 'skills',      label: 'Skills',  render: v => v ? v.split(',').slice(0,2).join(', ') + (v.split(',').length > 2 ? '…' : '') : '—' },
];

export default function AdminInternships() {
  const [items,   setItems]   = useState(() => getInternships());
  const [open,    setOpen]    = useState(false);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(EMPTY);
  const [confirm, setConfirm] = useState(null);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit   = useCallback(row => { setEditing(row); setForm({ title: row.title, duration: row.duration, stipend: row.stipend, skills: row.skills, description: row.description }); setOpen(true); }, []);
  const askDelete  = useCallback(row => setConfirm(row), []);

  function handleSave(e) {
    e.preventDefault();
    const updated = editing ? updateInternship(editing.id, form) : createInternship(form);
    setItems(updated); setOpen(false);
  }
  function handleDelete() { setItems(deleteInternship(confirm.id)); setConfirm(null); }

  const input = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all';
  const label = 'block text-xs font-semibold text-slate-600 mb-1.5';

  return (
    <div className="p-8">
      <PageHeader
        title="Internship Management"
        subtitle="Create and manage internship listings"
        action={{ label: 'Add Internship', icon: <Plus size={15} />, onClick: openCreate }}
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <AdminStatCard icon="🎓" label="Total Internships" value={items.length}  color="#7c3aed" />
        <AdminStatCard icon="⏱️" label="Avg Duration"      value={items.length ? `${items[0]?.duration?.split(' ')[0] || '—'}` : '—'} color="#16a34a" delay={0.07} />
        <AdminStatCard icon="💰" label="With Stipend"       value={items.filter(i => i.stipend).length} color="#2563eb" delay={0.14} />
        <AdminStatCard icon="📅" label="This Month"         value={items.filter(i => i.createdAt > Date.now() - 30*864e5).length} color="#dc2626" delay={0.21} />
      </div>

      <CrudTable columns={COLUMNS} rows={items} onEdit={openEdit} onDelete={askDelete} searchKeys={['title', 'skills']} />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Internship' : 'Add Internship'} wide>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className={label}>Title *</label>
            <input required className={input} placeholder="e.g. Frontend Developer Intern" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Duration *</label>
              <input required className={input} placeholder="e.g. 3 months" value={form.duration} onChange={e => setForm(f => ({...f, duration: e.target.value}))} />
            </div>
            <div>
              <label className={label}>Stipend</label>
              <input className={input} placeholder="e.g. ₹10,000/month" value={form.stipend} onChange={e => setForm(f => ({...f, stipend: e.target.value}))} />
            </div>
          </div>
          <div>
            <label className={label}>Skills (comma-separated) *</label>
            <input required className={input} placeholder="e.g. React, CSS, Figma" value={form.skills} onChange={e => setForm(f => ({...f, skills: e.target.value}))} />
          </div>
          <div>
            <label className={label}>Description *</label>
            <textarea required rows={4} className={`${input} resize-none`} placeholder="Internship description…" value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
            <button type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', boxShadow: '0 4px 12px rgba(124,58,237,0.3)' }}>
              {editing ? 'Save Changes' : 'Create Internship'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!confirm} onClose={() => setConfirm(null)} title="Delete Internship">
        <p className="text-sm text-slate-600 mb-1">Delete internship:</p>
        <p className="text-base font-bold text-slate-900 mb-5">"{confirm?.title}"</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setConfirm(null)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">Cancel</button>
          <button onClick={handleDelete} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700">Yes, Delete</button>
        </div>
      </Modal>
    </div>
  );
}
