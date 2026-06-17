import { useEffect, useMemo, useState } from 'react';
import AdminTopbar from './components/AdminTopbar';
import DataTable from './components/DataTable';
import { api } from '../utils/api';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tableColumns = useMemo(() => [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'category', label: 'Source' },
    { key: 'assignedTo', label: 'Assigned To' },
    { key: 'status', label: 'Status' },
  ], []);

  useEffect(() => {
    api.contacts.list()
      .then((data) => setContacts(data))
      .catch((err) => setError(err.message || 'Unable to load contacts'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <AdminTopbar pageTitle="Contact Management" statsSummary={[
        { label: 'Open Requests', value: contacts.filter((item) => item.status === 'New' || item.status === 'Pending').length.toString() },
        { label: 'Resolved', value: contacts.filter((item) => item.status === 'Resolved').length.toString() },
        { label: 'Assigned', value: contacts.filter((item) => item.assignedTo).length.toString() },
      ]} />

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-gray-300">Loading contacts...</div>
      ) : error ? (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center text-red-200">{error}</div>
      ) : (
        <DataTable
          title="Support and enquiry tracking"
          columns={tableColumns}
          rows={contacts}
          action={<button className="rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500">Export Data</button>}
        />
      )}
    </div>
  );
}
