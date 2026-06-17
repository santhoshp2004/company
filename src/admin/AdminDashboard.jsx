import { useEffect, useState } from 'react';
import AdminTopbar from './components/AdminTopbar';
import StatCard from './components/StatCard';
import ChartPreview from './components/ChartPreview';
import DataTable from './components/DataTable';
import { api } from '../utils/api';

const defaultAnalytics = {
  users: 1280,
  employees: 356,
  applications: 1420,
  activeJobs: 42,
  visitors: 57800,
  contactRequests: 122,
  revenue: 495000,
  charts: {
    monthlyApplications: [24, 36, 42, 53, 68, 74, 83, 91, 102, 118, 129, 141],
    traffic: [12, 22, 28, 48, 61, 72, 88, 94, 103, 112, 127, 134],
    employeeGrowth: [8, 16, 19, 26, 34, 45, 53, 61, 70, 80, 92, 101],
    jobPostingAnalytics: [10, 18, 30, 39, 52, 60, 72, 79, 86, 93, 106, 118],
  },
};

const recentActivities = [
  { type: 'User', message: 'Super Admin created a new HR Admin account.', time: '12 min ago' },
  { type: 'Job', message: 'Marketing Manager role moved to Interview Scheduled.', time: '45 min ago' },
  { type: 'Content', message: 'Homepage hero updated by Content Manager.', time: '2h ago' },
  { type: 'Partner', message: 'New strategic partner request approved.', time: '5h ago' },
];



export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(defaultAnalytics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.analytics.get()
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Could not load analytics');
        setLoading(false);
      });
  }, []);

  const stats = [
    { title: 'Total Users', value: analytics.users.toLocaleString(), icon: '👥' },
    { title: 'Total Employees', value: analytics.employees.toLocaleString(), icon: '🧑‍💼', color: 'from-emerald-500 to-teal-500' },
    { title: 'Active Jobs', value: analytics.activeJobs.toString(), icon: '📌', color: 'from-violet-500 to-fuchsia-500' },
    { title: 'Visitor Sessions', value: analytics.visitors.toLocaleString(), icon: '🌐', color: 'from-sky-500 to-cyan-500' },
  ];

  const chartData = analytics.charts;
  const summary = [
    { label: 'Total Users', value: analytics.users.toLocaleString() },
    { label: 'Total Employees', value: analytics.employees.toLocaleString() },
    { label: 'Total Job Applications', value: analytics.applications.toLocaleString() },
    { label: 'Total Active Jobs', value: analytics.activeJobs.toString() },
  ];

  return (
    <div className="space-y-6">
      <AdminTopbar pageTitle="Super Admin Dashboard" statsSummary={summary} />
      {error ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-red-300">{error}</div>
      ) : null}
      <section className="grid gap-6 xl:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <ChartPreview title="Monthly Applications" data={chartData.applications} />
        <ChartPreview title="Website Traffic" data={chartData.traffic} color="from-sky-500 to-blue-500" />
        <ChartPreview title="Employee Growth" data={chartData.growth} color="from-emerald-500 to-lime-500" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartPreview title="Job Posting Analytics" data={chartData.posting} color="from-purple-500 to-pink-500" />
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Activities</h2>
            <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Live feed</span>
          </div>
          <div className="space-y-4">
            {recentActivities.map((item, index) => (
              <div key={index} className="rounded-3xl border border-white/10 bg-dark-800/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white">{item.type}</p>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
                <p className="mt-2 text-sm text-gray-300">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10">
        <h2 className="text-lg font-bold text-white mb-4">Executive Summary</h2>
        <DataTable
          title="Key performance snapshot"
          columns={[
            { key: 'metric', label: 'Metric' },
            { key: 'value', label: 'Current' },
            { key: 'trend', label: 'Trend' },
          ]}
          rows={[
            { metric: 'Conversion Rate', value: '7.8%', trend: '↑ 1.2%' },
            { metric: 'Resume Reviews', value: '842', trend: '↑ 14%' },
            { metric: 'New Contacts', value: '1,140', trend: '↑ 9%' },
            { metric: 'Support Tickets', value: '27', trend: '↓ 5%' },
          ]}
        />
      </section>
    </div>
  );
}
