import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from './components/PageHeader';
import CrudTable  from './components/CrudTable';
import Modal      from './components/Modal';
import AdminStatCard from './components/AdminStatCard';
import { getPartners, createPartner, updatePartner, deletePartner } from './adminStore';

const EMPTY = { name: '', category: '', description: '', website: '' };

const COLUMNS = [
  { key: 'name',        label: 'Partner Name' },
  { key: 'category',    label: 'Category'     },
  { key: 'website',     label: 'Website',
    render: (v) => v ? <a href={v.startsWith('http') ? v : `https://${v}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate block">{v}</a> : '—'
  },
  { key: 'description', label: 'Description'  },
];

export default function AdminPartnersMgr() {
  const [items,   setItems]   = useState(() => getPartners());
  const [open,    setOpen]    = useState(false);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(EMPTY);
  const [confirm, setConfirm] = useState(null);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit   = useCallback(row => { setEditing(row); setForm({ name: row.name, category: row.category, description: row.description, website: row.website }); setOpen(true); }, []);
  const askDelete  = useCallback(row => setConfirm(row), []);

  function handleSave(e) {
    e.preventDefault();
    const updated = editing ? updatePartner(editing.id, form) : createPartner(form);
    setItems(updated); setOpen(false);
  }
  function handleDelete() { setItems(deletePartner(confirm.id)); setConfirm(null); }

  const input = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all';
  const label = 'block text-xs font-semibold text-slate-600 mb-1.5';

  return (
    <div className="p-8">
      <PageHeader
        title="Partners Management"
        subtitle="Manage business and technology partners"
        action={{ label: 'Add Partner', icon: <Plus size={15} />, onClick: openCreate }}
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <AdminStatCard icon="🤝" label="Total Partners"     value={items.length} color="#dc2626" />
        <AdminStatCard icon="⚙️" label="With Website"       value={items.filter(i => i.website).length} color="#2563eb" delay={0.07} />
        <AdminStatCard icon="🏷️" label="Categories"         value={[...new Set(items.map(i=>i.category).filter(Boolean))].length} color="#16a34a" delay={0.14} />
        <AdminStatCard icon="📅" label="Added This Month"   value={items.filter(i => i.createdAt > Date.now() - 30*864e5).length} color="#7c3aed" delay={0.21} />
      </div>

      <CrudTable columns={COLUMNS} rows={items} onEdit={openEdit} onDelete={askDelete} searchKeys={['name', 'category']} />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Partner' : 'Add Partner'} wide>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Partner Name *</label>
              <input required className={input} placeholder="e.g. TechEdge Solutions" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
            </div>
            <div>
              <label className={label}>Category *</label>
              <input required className={input} placeholder="e.g. Technology Partner" value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} />
            </div>
          </div>
          <div>
            <label className={label}>Website</label>
            <input className={input} type="url" placeholder="https://partner.com" value={form.website} onChange={e => setForm(f => ({...f, website: e.target.value}))} />
          </div>
          <div>
            <label className={label}>Description *</label>
            <textarea required rows={4} className={`${input} resize-none`} placeholder="Partner description…" value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">Cancel</button>
            <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#dc2626,#b91c1c)', boxShadow: '0 4px 12px rgba(220,38,38,0.3)' }}>
              {editing ? 'Save Changes' : 'Add Partner'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!confirm} onClose={() => setConfirm(null)} title="Delete Partner">
        <p className="text-sm text-slate-600 mb-1">Delete partner:</p>
        <p className="text-base font-bold text-slate-900 mb-5">"{confirm?.name}"</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setConfirm(null)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">Cancel</button>
          <button onClick={handleDelete} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700">Yes, Delete</button>
        </div>
      </Modal>
    </div>
  );
}
