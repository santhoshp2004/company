import { useEffect, useState, useMemo } from 'react';
import AdminTopbar from './components/AdminTopbar';
import DataTable from './components/DataTable';
import { api } from '../utils/api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', status: 'Active' });

  const tableColumns = useMemo(() => [
    { key: 'name', label: 'Product Name' },
    { key: 'description', label: 'Description' },
    { key: 'price', label: 'Price' },
    { key: 'status', label: 'Status' },
  ], []);

  useEffect(() => {
    api.products.list()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message || 'Unable to load products'))
      .finally(() => setLoading(false));
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const newProduct = await api.products.create(formData);
      setProducts([...products, newProduct]);
      setFormData({ name: '', description: '', price: '', status: 'Active' });
      setShowForm(false);
    } catch (err) {
      setError(err.message || 'Failed to add product');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.products.delete(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete product');
    }
  };

  return (
    <div className="space-y-6">
      <AdminTopbar pageTitle="Product Management" statsSummary={[
        { label: 'Total Products', value: products.length.toString() },
        { label: 'Active', value: products.filter((p) => p.status === 'Active').length.toString() },
      ]} />

      {error ? (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-300">{error}</div>
      ) : null}

      {showForm && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10">
          <h2 className="text-lg font-bold text-white mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Product Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 outline-none"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 outline-none"
                placeholder="Enter description"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Price</label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 outline-none"
                placeholder="e.g., $99/mo or Free"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-2xl bg-primary-600 px-6 py-2 font-semibold text-white hover:bg-primary-500"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-2 font-semibold text-white hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-gray-300">Loading products...</div>
      ) : (
        <DataTable
          title="Manage products"
          columns={[
            ...tableColumns,
            {
              key: 'actions',
              label: 'Actions',
              render: (row) => (
                <button
                  onClick={() => handleDeleteProduct(row._id)}
                  className="text-red-400 hover:text-red-300 text-sm font-semibold"
                >
                  Delete
                </button>
              ),
            },
          ]}
          rows={products}
          action={
            <button
              onClick={() => setShowForm(!showForm)}
              className="rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500"
            >
              {showForm ? 'Cancel' : 'Add Product'}
            </button>
          }
        />
      )}
    </div>
  );
}
