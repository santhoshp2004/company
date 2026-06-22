import { useState, useEffect, useCallback, useMemo } from 'react';
import { Plus, Search, Trash2, CheckCircle, XCircle, Eye, Download, CalendarDays, Mail, RefreshCcw } from 'lucide-react';
import PageHeader from './components/PageHeader';
import CrudTable  from './components/CrudTable';
import Modal      from './components/Modal';
import AdminStatCard from './components/AdminStatCard';
import { getJobs, createJob, updateJob, deleteJob, getApplications, updateApplication, deleteApplication, scheduleInterview, resendInterviewInvitation } from './adminStore';

const EMPTY = { title: '', experience: '', location: '', skills: '', description: '', salary: '' };

const JOB_COLUMNS = [
  { key: 'title',       label: 'Job Title'   },
  { key: 'location',    label: 'Location'    },
  { key: 'experience',  label: 'Experience'  },
  { key: 'salary',      label: 'Salary'      },
  { key: 'skills',      label: 'Skills',     render: v => v ? v.split(',').slice(0,2).join(', ') + (v.split(',').length > 2 ? '…' : '') : '—' },
];

export default function AdminCareers() {
  const [activeTab, setActiveTab] = useState('Jobs');
  
  // Jobs State
  const [jobs, setJobs] = useState(() => getJobs());
  const [openJobModal, setOpenJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobForm, setJobForm] = useState(EMPTY);
  const [confirmJobDelete, setConfirmJobDelete] = useState(null);

  // Applications State
  const [applications, setApplications] = useState([]);
  const [searchApp, setSearchApp] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [viewApp, setViewApp] = useState(null);
  const [confirmAppDelete, setConfirmAppDelete] = useState(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleTarget, setScheduleTarget] = useState(null);
  const [scheduleForm, setScheduleForm] = useState({ date: '', time: '', mode: 'Online', meetingLink: '', location: '', notes: '' });
  const [isSavingSchedule, setIsSavingSchedule] = useState(false);
  const [isResendingEmail, setIsResendingEmail] = useState(false);

  const fetchApplications = useCallback(async () => {
    const data = await getApplications();
    setApplications(data);
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Jobs Actions
  const openCreateJob = () => { setEditingJob(null); setJobForm(EMPTY); setOpenJobModal(true); };
  const openEditJob = useCallback(row => { setEditingJob(row); setJobForm({ title: row.title, experience: row.experience, location: row.location, skills: row.skills, description: row.description, salary: row.salary }); setOpenJobModal(true); }, []);
  const askDeleteJob = useCallback(row => setConfirmJobDelete(row), []);

  function handleSaveJob(e) {
    e.preventDefault();
    const updated = editingJob ? updateJob(editingJob.id, jobForm) : createJob(jobForm);
    setJobs(updated);
    setOpenJobModal(false);
  }
  function handleDeleteJob() {
    setJobs(deleteJob(confirmJobDelete.id));
    setConfirmJobDelete(null);
  }

  // Application Actions
  async function handleUpdateAppStatus(id, newStatus) {
    await updateApplication(id, { status: newStatus });
    fetchApplications();
  }
  async function handleDeleteApp() {
    await deleteApplication(confirmAppDelete.id);
    setConfirmAppDelete(null);
    fetchApplications();
  }

  function openScheduleModal(application) {
    setScheduleTarget(application);
    setScheduleForm({
      date: application.interview?.date || '',
      time: application.interview?.time || '',
      mode: application.interview?.mode || 'Online',
      meetingLink: application.interview?.meetingLink || '',
      location: application.interview?.location || '',
      notes: application.interview?.notes || '',
    });
    setScheduleModalOpen(true);
  }

  async function handleScheduleSave(e, sendInvitation) {
    e.preventDefault();
    if (!scheduleTarget) return;
    if (!scheduleForm.date || !scheduleForm.time) {
      alert('Please select both date and time.');
      return;
    }
    if (scheduleForm.mode === 'Online' && !scheduleForm.meetingLink) {
      alert('Please provide a meeting link for online interviews.');
      return;
    }
    if (scheduleForm.mode === 'Offline' && !scheduleForm.location) {
      alert('Please provide a location for offline interviews.');
      return;
    }

    setIsSavingSchedule(true);
    try {
      const updated = await scheduleInterview(scheduleTarget.id, scheduleForm, sendInvitation);
      setViewApp(updated);
      fetchApplications();
      setScheduleModalOpen(false);
    } catch (err) {
      alert(err.message || 'Failed to schedule interview.');
    } finally {
      setIsSavingSchedule(false);
    }
  }

  async function handleResendInvitation(application) {
    setIsResendingEmail(true);
    try {
      const updated = await resendInterviewInvitation(application.id);
      setViewApp(updated);
      fetchApplications();
    } catch (err) {
      alert(err.message || 'Failed to resend invitation.');
    } finally {
      setIsResendingEmail(false);
    }
  }

  // Derived Application State
  const filteredApps = useMemo(() => {
    return applications.filter(a => {
      const matchSearch = a.name?.toLowerCase().includes(searchApp.toLowerCase()) || 
                          a.jobRole?.toLowerCase().includes(searchApp.toLowerCase()) ||
                          a.email?.toLowerCase().includes(searchApp.toLowerCase());
      const matchStatus = filterStatus === 'All' || a.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [applications, searchApp, filterStatus]);

  const stats = useMemo(() => {
    const pending = applications.filter(a => !a.status || a.status === 'Applied' || a.status === 'Pending').length;
    const shortlisted = applications.filter(a => a.status === 'Shortlisted').length;
    const scheduled = applications.filter(a => a.status === 'Interview Scheduled').length;
    const selected = applications.filter(a => a.status === 'Selected' || a.status === 'Approved').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;
    return { total: applications.length, pending, shortlisted, scheduled, selected, rejected };
  }, [applications]);

  const upcomingInterviews = useMemo(() => {
    return applications
      .filter((app) => app.interview?.date && app.interview?.time)
      .sort((a, b) => new Date(`${a.interview.date}T${a.interview.time}:00`) - new Date(`${b.interview.date}T${b.interview.time}:00`));
  }, [applications]);

  const inputCls = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all';
  const labelCls = 'block text-xs font-semibold text-slate-600 mb-1.5';

  return (
    <div className="p-8 pb-20">
      <PageHeader
        title="Careers Management"
        subtitle="Manage job listings and track applications"
        action={activeTab === 'Jobs' ? { label: 'Add Job', icon: <Plus size={15} />, onClick: openCreateJob } : undefined}
      />

      {/* TABS */}
      <div className="flex border-b border-slate-200 mb-8">
        {['Jobs', 'Applications'].map(tab => (
          <button
            key={tab}
            className={`py-3 px-6 text-sm font-bold border-b-2 transition-all ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Jobs' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <AdminStatCard icon="💼" label="Total Jobs" value={jobs.length} color="#2563eb" />
            <AdminStatCard icon="📍" label="Locations"  value={[...new Set(jobs.map(j => j.location).filter(Boolean))].length} color="#16a34a" delay={0.07} />
            <AdminStatCard icon="🏷️" label="With Salary" value={jobs.filter(j => j.salary).length} color="#7c3aed" delay={0.14} />
            <AdminStatCard icon="📅" label="This Month"  value={jobs.filter(j => j.createdAt > Date.now() - 30*864e5).length} color="#dc2626" delay={0.21} />
          </div>

          <CrudTable
            columns={JOB_COLUMNS}
            rows={jobs}
            onEdit={openEditJob}
            onDelete={askDeleteJob}
            searchKeys={['title', 'location', 'skills']}
          />
        </div>
      )}

      {activeTab === 'Applications' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-2 xl:grid-cols-6 gap-4 mb-6">
            <AdminStatCard icon="📨" label="Total Applications" value={stats.total} color="#2563eb" />
            <AdminStatCard icon="⏳" label="Pending" value={stats.pending} color="#f59e0b" delay={0.07} />
            <AdminStatCard icon="⭐" label="Shortlisted" value={stats.shortlisted} color="#8b5cf6" delay={0.14} />
            <AdminStatCard icon="📆" label="Interview Scheduled" value={stats.scheduled} color="#0ea5e9" delay={0.21} />
            <AdminStatCard icon="✅" label="Selected" value={stats.selected} color="#10b981" delay={0.28} />
            <AdminStatCard icon="❌" label="Rejected" value={stats.rejected} color="#ef4444" delay={0.35} />
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by applicant name, email, or position..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                value={searchApp}
                onChange={e => setSearchApp(e.target.value)}
              />
            </div>
            <select 
              className="py-2.5 px-4 rounded-xl border border-slate-200 text-sm font-semibold outline-none focus:border-blue-500"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied / Pending</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Selected">Approved / Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Applications Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                    <th className="px-6 py-4">Applicant Info</th>
                    <th className="px-6 py-4">Job Position</th>
                    <th className="px-6 py-4">Experience</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApps.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">No applications found.</td></tr>
                  ) : filteredApps.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 text-sm">{app.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{app.email}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{app.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                        {app.jobRole || 'Unknown Role'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {app.experience || '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          app.status === 'Selected' || app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                          app.status === 'Shortlisted' ? 'bg-purple-100 text-purple-700' :
                          app.status === 'Interview Scheduled' ? 'bg-sky-100 text-sky-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {app.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setViewApp(app)} title="View Details" className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors">
                            <Eye size={16} />
                          </button>
                          <button onClick={() => openScheduleModal(app)} title="Schedule Interview" className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                            <CalendarDays size={16} />
                          </button>
                          <button onClick={() => setConfirmAppDelete(app)} title="Delete" className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] font-bold text-slate-500">Upcoming Interviews</p>
                <h2 className="text-2xl font-bold text-slate-900">Calendar Preview</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                <Mail size={16} /> Invite tracking enabled
              </div>
            </div>

            {upcomingInterviews.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                No interviews scheduled yet.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {upcomingInterviews.map((app) => (
                  <div key={app.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold">{app.interview?.mode || 'Interview'}</p>
                        <h3 className="text-lg font-bold text-slate-900">{app.jobRole}</h3>
                      </div>
                      <span className="text-xs font-semibold uppercase text-slate-500">{app.status || 'Scheduled'}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{app.name} · {app.email}</p>
                    <div className="grid gap-2 text-sm text-slate-700">
                      <div className="flex items-center gap-2"><CalendarDays size={16} /> {app.interview?.date}</div>
                      <div className="flex items-center gap-2"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500">⏰</span> {app.interview?.time}</div>
                      <div className="flex items-center gap-2"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500">{app.interview?.mode === 'Offline' ? '📍' : '💻'}</span> {app.interview?.mode}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* JOBS MODALS */}
      <Modal open={openJobModal} onClose={() => setOpenJobModal(false)} title={editingJob ? 'Edit Job' : 'Add New Job'} wide>
        <form onSubmit={handleSaveJob} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Job Title *</label>
              <input required className={inputCls} placeholder="e.g. Senior React Developer" value={jobForm.title} onChange={e => setJobForm(f => ({...f, title: e.target.value}))} />
            </div>
            <div>
              <label className={labelCls}>Experience *</label>
              <input required className={inputCls} placeholder="e.g. 3–5 years" value={jobForm.experience} onChange={e => setJobForm(f => ({...f, experience: e.target.value}))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Location *</label>
              <input required className={inputCls} placeholder="e.g. Remote / Chennai" value={jobForm.location} onChange={e => setJobForm(f => ({...f, location: e.target.value}))} />
            </div>
            <div>
              <label className={labelCls}>Salary</label>
              <input className={inputCls} placeholder="e.g. ₹8–12 LPA" value={jobForm.salary} onChange={e => setJobForm(f => ({...f, salary: e.target.value}))} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Skills (comma-separated) *</label>
            <input required className={inputCls} placeholder="e.g. React, Node.js, PostgreSQL" value={jobForm.skills} onChange={e => setJobForm(f => ({...f, skills: e.target.value}))} />
          </div>
          <div>
            <label className={labelCls}>Description *</label>
            <textarea required rows={4} className={`${inputCls} resize-none`} placeholder="Job description…" value={jobForm.description} onChange={e => setJobForm(f => ({...f, description: e.target.value}))} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setOpenJobModal(false)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', boxShadow: '0 4px 12px rgba(22,163,74,0.3)' }}>
              {editingJob ? 'Save Changes' : 'Create Job'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!confirmJobDelete} onClose={() => setConfirmJobDelete(null)} title="Delete Job">
        <p className="text-sm text-slate-600 mb-1">Are you sure you want to delete:</p>
        <p className="text-base font-bold text-slate-900 mb-5">"{confirmJobDelete?.title}"</p>
        <p className="text-xs text-slate-400 mb-5">This will remove it from the public Careers page immediately.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setConfirmJobDelete(null)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
          <button onClick={handleDeleteJob} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors">Yes, Delete</button>
        </div>
      </Modal>

      {/* APPLICATIONS MODALS */}
      <Modal open={!!viewApp} onClose={() => setViewApp(null)} title="Application Details" wide>
        {viewApp && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Applicant Name</h4>
                <p className="text-sm font-bold text-slate-800">{viewApp.name}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Applied Position</h4>
                <p className="text-sm font-bold text-blue-600">{viewApp.jobRole}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email</h4>
                <p className="text-sm font-medium text-slate-700">{viewApp.email}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</h4>
                <p className="text-sm font-medium text-slate-700">{viewApp.phone}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-4">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Experience</h4>
                <p className="text-sm text-slate-800">{viewApp.experience || 'Not specified'}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Key Skills</h4>
                {viewApp.skills ? (
                  <div className="flex flex-wrap gap-2">
                    {viewApp.skills.split(',').map(s => <span key={s} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-md text-xs font-bold">{s.trim()}</span>)}
                  </div>
                ) : <p className="text-sm text-slate-500">Not specified</p>}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Cover Letter / Message</h4>
              <div className="p-4 bg-slate-50 rounded-xl text-sm text-slate-700 leading-relaxed border border-slate-100 min-h-[100px] whitespace-pre-wrap">
                {viewApp.coverLetter || <span className="text-slate-400 italic">No cover letter provided.</span>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-3">
                <a href={viewApp.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                  <Download size={16} /> View Resume
                </a>
                <button onClick={() => openScheduleModal(viewApp)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors">
                  <CalendarDays size={16} /> Schedule Interview
                </button>
                {viewApp.interview?.date && (
                  <button onClick={() => handleResendInvitation(viewApp)} disabled={isResendingEmail} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors">
                    <RefreshCcw size={16} /> {isResendingEmail ? 'Resending...' : 'Resend Invitation'}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 mr-2">Change Status:</span>
                <select 
                  className="py-2 px-3 rounded-lg border border-slate-200 text-sm font-semibold outline-none focus:border-blue-500"
                  value={viewApp.status || 'Applied'}
                  onChange={async (e) => {
                    const updated = await updateApplication(viewApp.id, { status: e.target.value });
                    setViewApp(updated);
                    fetchApplications();
                  }}
                >
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={scheduleModalOpen} onClose={() => setScheduleModalOpen(false)} title="Schedule Interview" wide>
        <form onSubmit={(e) => handleScheduleSave(e, false)} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Interview Date *</label>
              <input required type="date" className={inputCls} value={scheduleForm.date} onChange={(e) => setScheduleForm((f) => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Interview Time *</label>
              <input required type="time" className={inputCls} value={scheduleForm.time} onChange={(e) => setScheduleForm((f) => ({ ...f, time: e.target.value }))} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Interview Mode *</label>
              <select className={inputCls} value={scheduleForm.mode} onChange={(e) => setScheduleForm((f) => ({ ...f, mode: e.target.value }))}>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
            {scheduleForm.mode === 'Online' ? (
              <div>
                <label className={labelCls}>Meeting Link *</label>
                <input required className={inputCls} placeholder="Google Meet / Zoom link" value={scheduleForm.meetingLink} onChange={(e) => setScheduleForm((f) => ({ ...f, meetingLink: e.target.value }))} />
              </div>
            ) : (
              <div>
                <label className={labelCls}>Interview Location *</label>
                <input required className={inputCls} placeholder="Office address or room" value={scheduleForm.location} onChange={(e) => setScheduleForm((f) => ({ ...f, location: e.target.value }))} />
              </div>
            )}
          </div>
          <div>
            <label className={labelCls}>Interview Notes</label>
            <textarea rows={4} className={`${inputCls} resize-none`} placeholder="Meeting instructions, panel details, and agenda" value={scheduleForm.notes} onChange={(e) => setScheduleForm((f) => ({ ...f, notes: e.target.value }))} />
          </div>
          <div className="flex flex-wrap gap-3 justify-end pt-2">
            <button type="button" onClick={() => setScheduleModalOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
            <button type="button" onClick={(e) => handleScheduleSave(e, false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-900 bg-slate-200 hover:bg-slate-300 transition-colors">Save Schedule</button>
            <button type="button" onClick={(e) => handleScheduleSave(e, true)} disabled={isSavingSchedule} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors">{isSavingSchedule ? 'Saving...' : 'Save & Send Invitation'}</button>
          </div>
        </form>
      </Modal>

      <Modal open={!!confirmAppDelete} onClose={() => setConfirmAppDelete(null)} title="Delete Application">
        <p className="text-sm text-slate-600 mb-1">Are you sure you want to delete the application from:</p>
        <p className="text-base font-bold text-slate-900 mb-5">{confirmAppDelete?.name} ({confirmAppDelete?.email})</p>
        <p className="text-xs text-red-500 font-bold mb-5">This action cannot be undone and will permanently remove their data.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setConfirmAppDelete(null)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
          <button onClick={handleDeleteApp} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors">Yes, Delete</button>
        </div>
      </Modal>

    </div>
  );
}
