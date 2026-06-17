import { useEffect, useMemo, useState } from 'react';
import AdminTopbar from './components/AdminTopbar';
import DataTable from './components/DataTable';
import { api } from '../utils/api';

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tableColumns = useMemo(() => [
    { key: 'title', label: 'Job Title' },
    { key: 'department', label: 'Department' },
    { key: 'experience', label: 'Experience' },
    { key: 'skills', label: 'Skills' },
    { key: 'salaryRange', label: 'Salary' },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status' },
  ], []);

  useEffect(() => {
    api.jobs.list()
      .then((data) => setJobs(data))
      .catch((err) => setError(err.message || 'Unable to load jobs'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <AdminTopbar pageTitle="Career Management" statsSummary={[
        { label: 'Active Jobs', value: jobs.filter((j) => j.status === 'Open' || j.status === 'Published').length.toString() },
        { label: 'Total Listings', value: jobs.length.toString() },
        { label: 'Closed Roles', value: jobs.filter((j) => j.status === 'Closed').length.toString() },
      ]} />

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-gray-300">Loading jobs...</div>
      ) : error ? (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center text-red-200">{error}</div>
      ) : (
        <DataTable
          title="Job postings and lifecycle dashboard"
          columns={tableColumns}
          rows={jobs}
          action={<button className="rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500">Create Job</button>}
        />
      )}
    </div>
  );
}
