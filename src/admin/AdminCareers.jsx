import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from './components/PageHeader';
import CrudTable  from './components/CrudTable';
import Modal      from './components/Modal';
import AdminStatCard from './components/AdminStatCard';
import { getJobs, createJob, updateJob, deleteJob } from './adminStore';

const EMPTY = { title: '', experience: '', location: '', skills: '', description: '', salary: '' };

const COLUMNS = [
  { key: 'title',       label: 'Job Title'   },
  { key: 'location',    label: 'Location'    },
  { key: 'experience',  label: 'Experience'  },
  { key: 'salary',      label: 'Salary'      },
  { key: 'skills',      label: 'Skills',     render: v => v ? v.split(',').slice(0,2).join(', ') + (v.split(',').length > 2 ? '…' : '') : '—' },
];

export default function AdminCareers() {
  const [jobs,    setJobs]    = useState(() => getJobs());
  const [open,    setOpen]    = useState(false);
  const [editing, setEditing] = useState(null);   // null = new
  const [form,    setForm]    = useState(EMPTY);
  const [confirm, setConfirm] = useState(null);   // row to delete

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit   = useCallback(row => { setEditing(row); setForm({ title: row.title, experience: row.experience, location: row.location, skills: row.skills, description: row.description, salary: row.salary }); setOpen(true); }, []);
  const askDelete  = useCallback(row => setConfirm(row), []);

  function handleSave(e) {
    e.preventDefault();
    const updated = editing
      ? updateJob(editing.id, form)
      : createJob(form);
    setJobs(updated);
    setOpen(false);
  }

  function handleDelete() {
    setJobs(deleteJob(confirm.id));
    setConfirm(null);
  }

  const input = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all';
  const label = 'block text-xs font-semibold text-slate-600 mb-1.5';

  return (
    <div className="p-8">
      <PageHeader
        title="Careers Management"
        subtitle="Create and manage job listings"
        action={{ label: 'Add Job', icon: <Plus size={15} />, onClick: openCreate }}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <AdminStatCard icon="💼" label="Total Jobs" value={jobs.length} color="#2563eb" />
        <AdminStatCard icon="📍" label="Locations"  value={[...new Set(jobs.map(j => j.location).filter(Boolean))].length} color="#16a34a" delay={0.07} />
        <AdminStatCard icon="🏷️" label="With Salary" value={jobs.filter(j => j.salary).length} color="#7c3aed" delay={0.14} />
        <AdminStatCard icon="📅" label="This Month"  value={jobs.filter(j => j.createdAt > Date.now() - 30*864e5).length} color="#dc2626" delay={0.21} />
      </div>

      <CrudTable
        columns={COLUMNS}
        rows={jobs}
        onEdit={openEdit}
        onDelete={askDelete}
        searchKeys={['title', 'location', 'skills']}
      />

      {/* Create / Edit modal */}
      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Job' : 'Add New Job'} wide>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Job Title *</label>
              <input required className={input} placeholder="e.g. Senior React Developer" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
            </div>
            <div>
              <label className={label}>Experience *</label>
              <input required className={input} placeholder="e.g. 3–5 years" value={form.experience} onChange={e => setForm(f => ({...f, experience: e.target.value}))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Location *</label>
              <input required className={input} placeholder="e.g. Remote / Chennai" value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} />
            </div>
            <div>
              <label className={label}>Salary</label>
              <input className={input} placeholder="e.g. ₹8–12 LPA" value={form.salary} onChange={e => setForm(f => ({...f, salary: e.target.value}))} />
            </div>
          </div>
          <div>
            <label className={label}>Skills (comma-separated) *</label>
            <input required className={input} placeholder="e.g. React, Node.js, PostgreSQL" value={form.skills} onChange={e => setForm(f => ({...f, skills: e.target.value}))} />
          </div>
          <div>
            <label className={label}>Description *</label>
            <textarea required rows={4} className={`${input} resize-none`} placeholder="Job description…" value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
            <button type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', boxShadow: '0 4px 12px rgba(22,163,74,0.3)' }}>
              {editing ? 'Save Changes' : 'Create Job'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!confirm} onClose={() => setConfirm(null)} title="Delete Job">
        <p className="text-sm text-slate-600 mb-1">Are you sure you want to delete:</p>
        <p className="text-base font-bold text-slate-900 mb-5">"{confirm?.title}"</p>
        <p className="text-xs text-slate-400 mb-5">This will remove it from the public Careers page immediately.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setConfirm(null)}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
          <button onClick={handleDelete}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors">
            Yes, Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
