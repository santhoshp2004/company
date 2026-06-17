import AdminTopbar from './components/AdminTopbar';

const settings = [
  { label: 'Company Name', value: 'Beta Softnet Private Limited' },
  { label: 'SMTP Host', value: 'smtp.betasoftnet.com' },
  { label: 'WhatsApp Number', value: '+91 91234 56789' },
  { label: 'Analytics ID', value: 'G-XXXXXXX' },
];

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <AdminTopbar pageTitle="Settings" statsSummary={[
        { label: 'Active Integrations', value: '8' },
        { label: 'Notifications', value: 'On' },
        { label: 'Tracking Enabled', value: 'Yes' },
      ]} />

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10">
          <h2 className="text-lg font-bold text-white mb-4">Company Settings</h2>
          <div className="space-y-4">
            {settings.map((setting) => (
              <div key={setting.label} className="rounded-3xl border border-white/10 bg-dark-800/80 p-4">
                <p className="text-sm text-gray-400">{setting.label}</p>
                <p className="mt-2 text-base font-semibold text-white">{setting.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10">
          <h2 className="text-lg font-bold text-white mb-4">Theme & Branding</h2>
          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-dark-800/80 p-4">
              <p className="text-sm text-gray-400">Logo Upload</p>
              <div className="mt-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">Drag & drop or click to upload company logo.</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-dark-800/80 p-4">
              <p className="text-sm text-gray-400">Social Media Links</p>
              <p className="mt-2 text-sm text-white">LinkedIn, Twitter, Instagram, YouTube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
