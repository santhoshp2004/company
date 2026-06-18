import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from './components/PageHeader';
import CrudTable  from './components/CrudTable';
import Modal      from './components/Modal';
import AdminStatCard from './components/AdminStatCard';
import { getAdminProducts, createAdminProduct, updateAdminProduct, deleteAdminProduct } from './adminStore';

const CATEGORIES = ['Business', 'Base', 'Public'];
const EMPTY = { name: '', category: 'Business', description: '' };

const COLUMNS = [
  { key: 'name',        label: 'Product Name' },
  { key: 'category',    label: 'Category',
    render: (v) => (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
        v === 'Business' ? 'bg-blue-100 text-blue-700' :
        v === 'Base'     ? 'bg-green-100 text-green-700' :
                           'bg-violet-100 text-violet-700'
      }`}>{v}</span>
    )
  },
  { key: 'description', label: 'Description' },
];

export default function AdminProductsMgr() {
  const [items,   setItems]   = useState(() => getAdminProducts());
  const [open,    setOpen]    = useState(false);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(EMPTY);
  const [confirm, setConfirm] = useState(null);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit   = useCallback(row => { setEditing(row); setForm({ name: row.name, category: row.category, description: row.description }); setOpen(true); }, []);
  const askDelete  = useCallback(row => setConfirm(row), []);

  function handleSave(e) {
    e.preventDefault();
    const updated = editing ? updateAdminProduct(editing.id, form) : createAdminProduct(form);
    setItems(updated); setOpen(false);
  }
  function handleDelete() { setItems(deleteAdminProduct(confirm.id)); setConfirm(null); }

  const input = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all';
  const label = 'block text-xs font-semibold text-slate-600 mb-1.5';

  const byCategory = cat => items.filter(i => i.category === cat).length;

  return (
    <div className="p-8">
      <PageHeader
        title="Products Management"
        subtitle="Manage your product catalogue"
        action={{ label: 'Add Product', icon: <Plus size={15} />, onClick: openCreate }}
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <AdminStatCard icon="📦" label="Total Products" value={items.length}        color="#16a34a" />
        <AdminStatCard icon="🏢" label="Business"       value={byCategory('Business')} color="#2563eb" delay={0.07} />
        <AdminStatCard icon="🔧" label="Base"           value={byCategory('Base')}     color="#16a34a" delay={0.14} />
        <AdminStatCard icon="🌐" label="Public"         value={byCategory('Public')}   color="#7c3aed" delay={0.21} />
      </div>

      <CrudTable columns={COLUMNS} rows={items} onEdit={openEdit} onDelete={askDelete} searchKeys={['name', 'category', 'description']} />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Product' : 'Add Product'} wide>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className={label}>Product Name *</label>
            <input required className={input} placeholder="e.g. Beta ERP" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
          </div>
          <div>
            <label className={label}>Category *</label>
            <select required className={input} value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Description *</label>
            <textarea required rows={4} className={`${input} resize-none`} placeholder="Product description…" value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">Cancel</button>
            <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', boxShadow: '0 4px 12px rgba(22,163,74,0.3)' }}>
              {editing ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!confirm} onClose={() => setConfirm(null)} title="Delete Product">
        <p className="text-sm text-slate-600 mb-1">Delete product:</p>
        <p className="text-base font-bold text-slate-900 mb-5">"{confirm?.name}"</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setConfirm(null)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">Cancel</button>
          <button onClick={handleDelete} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700">Yes, Delete</button>
        </div>
      </Modal>
    </div>
  );
}
