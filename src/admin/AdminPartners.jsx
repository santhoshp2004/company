import AdminTopbar from './components/AdminTopbar';
import DataTable from './components/DataTable';

const partners = [
  { name: 'CloudWave', type: 'Technology Partner', status: 'Approved', contact: 'Nisha Rao' },
  { name: 'GrowthEdge', type: 'Strategic Partner', status: 'Pending', contact: 'Priya Kapoor' },
  { name: 'TalentLink', type: 'Partner Applicant', status: 'Rejected', contact: 'Rahul Mehta' },
];

export default function AdminPartners() {
  return (
    <div className="space-y-6">
      <AdminTopbar pageTitle="Partner Management" statsSummary={[
        { label: 'Partners', value: '22' },
        { label: 'Applications', value: '34' },
        { label: 'Active Collaborations', value: '14' },
      ]} />

      <DataTable
        title="Approve, reject and manage partner profiles"
        columns={[
          { key: 'name', label: 'Partner' },
          { key: 'type', label: 'Type' },
          { key: 'status', label: 'Status' },
          { key: 'contact', label: 'Owner' },
        ]}
        rows={partners}
        action={<button className="rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500">Review Applications</button>}
      />
    </div>
  );
}
