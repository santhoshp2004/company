import AdminTopbar from './components/AdminTopbar';
import DataTable from './components/DataTable';

const employees = [
  { name: 'Aditi Verma', department: 'Engineering', status: 'Active', attendance: '98%', leaveBalance: '12 days' },
  { name: 'Sameer Jain', department: 'Sales', status: 'Active', attendance: '94%', leaveBalance: '8 days' },
  { name: 'Tara Nair', department: 'HR', status: 'On Leave', attendance: '89%', leaveBalance: '5 days' },
];

export default function AdminEmployees() {
  return (
    <div className="space-y-6">
      <AdminTopbar pageTitle="Employee Management" statsSummary={[
        { label: 'Directory Size', value: '356' },
        { label: 'On Leave', value: '24' },
        { label: 'Training Programs', value: '9' },
      ]} />

      <DataTable
        title="Directory, attendance, leave and performance"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'department', label: 'Department' },
          { key: 'status', label: 'Status' },
          { key: 'attendance', label: 'Attendance' },
          { key: 'leaveBalance', label: 'Leave Balance' },
        ]}
        rows={employees}
        action={<button className="rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500">Run Review</button>}
      />
    </div>
  );
}
