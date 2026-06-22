import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, THEMES } from '../context/ThemeContext';
import { createApplication } from '../admin/adminStore';

/* ── Static fallback jobs ── */
const DEFAULT_JOBS = [
  { id: 'd1', title: 'Senior Full-Stack Developer', team: 'Engineering', type: 'Full-time', location: 'Remote', experience: '5+ years', skills: 'React,Node.js,PostgreSQL,Docker', description: 'Build and maintain scalable web applications across our product suite.' },
  { id: 'd2', title: 'React Native Developer',      team: 'Engineering', type: 'Full-time', location: 'Remote', experience: '3+ years', skills: 'React Native,JavaScript,iOS,Android', description: 'Develop cross-platform mobile apps for our healthcare and education products.' },
  { id: 'd3', title: 'Backend Developer (Python)',  team: 'Engineering', type: 'Full-time', location: 'Remote', experience: '4+ years', skills: 'Python,Django,REST APIs,AWS', description: 'Design and build robust APIs powering our enterprise platforms.' },
];

/* ── Static fallback internships ── */
const DEFAULT_INTERNSHIPS = [
  { id: 'i1', title: 'Frontend Developer Intern',  team: 'Engineering', duration: '6 months', stipend: '₹15,000/mo', skills: 'React,Tailwind CSS,JavaScript', description: 'Help build intuitive interfaces for our core SAAS products.' },
  { id: 'i2', title: 'UI Design Intern',           team: 'Design',      duration: '3 months', stipend: '₹10,000/mo', skills: 'Figma,Adobe XD,Prototyping', description: 'Assist in designing wireframes and prototypes for web and mobile apps.' },
];

const BENEFITS = [
  { icon: '🌍', title: 'Remote-First',      desc: 'Work from anywhere. We have team members across India and beyond.' },
  { icon: '📈', title: 'Career Growth',     desc: 'Structured growth plans, mentorship, and fast promotions for performers.' },
  { icon: '🎓', title: 'Learning Budget',   desc: '₹20,000 per year for courses, certifications and technical conferences.' },
  { icon: '🏖️', title: 'Flexible PTO',     desc: 'We trust you to manage your time. Take the rest you need to perform.' },
  { icon: '💊', title: 'Health Insurance',  desc: 'Comprehensive medical insurance covering you and your immediate family.' },
  { icon: '💻', title: 'Work Equipment',    desc: 'MacBook or high-spec laptop + accessories provided from day one.' },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function readJobs() {
  try {
    const stored = JSON.parse(localStorage.getItem('jobs') || '[]');
    return Array.isArray(stored) && stored.length > 0 ? stored : DEFAULT_JOBS;
  } catch {
    return DEFAULT_JOBS;
  }
}

function readInternships() {
  try {
    const stored = JSON.parse(localStorage.getItem('internships') || '[]');
    return Array.isArray(stored) && stored.length > 0 ? stored : DEFAULT_INTERNSHIPS;
  } catch {
    return DEFAULT_INTERNSHIPS;
  }
}

export default function Careers() {
  const { theme }   = useTheme();
  const isLight     = theme === THEMES.VISION;

  const [expandedJob,  setExpandedJob]  = useState(null);
  const [jobs,         setJobs]         = useState(readJobs);
  const [internships,  setInternships]  = useState(readInternships);
  
  // Application Modal State
  const [applyJob,     setApplyJob]     = useState(null);
  const [appForm,      setAppForm]      = useState({ name: '', email: '', phone: '', resume: '', experience: '', skills: '', coverLetter: '' });
  const [appSuccess,   setAppSuccess]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    function sync() {
      setJobs(readJobs());
      setInternships(readInternships());
    }
    const timer = setInterval(sync, 2000);
    window.addEventListener('storage', sync);
    return () => {
      clearInterval(timer);
      window.removeEventListener('storage', sync);
    };
  }, []);

  async function handleApplySubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await createApplication({
      jobId: applyJob.id,
      jobRole: applyJob.title || applyJob.role || 'Untitled Role',
      name: appForm.name,
      email: appForm.email,
      phone: appForm.phone,
      resume: appForm.resume,
      experience: appForm.experience,
      skills: appForm.skills,
      coverLetter: appForm.coverLetter
    });
    setIsSubmitting(false);
    if (!result) {
      alert('Application could not be submitted. Please try again.');
      return;
    }
    setAppSuccess(true);
    setTimeout(() => {
      setAppSuccess(false);
      setApplyJob(null);
      setAppForm({ name: '', email: '', phone: '', resume: '', experience: '', skills: '', coverLetter: '' });
    }, 2500);
  }

  const pageBg    = isLight ? 'bg-slate-50'  : 'bg-[#07071a]';
  const headingCls= isLight ? 'text-slate-900' : 'text-white';
  const subCls    = isLight ? 'text-slate-600' : 'text-gray-400';
  const cardBase  = isLight
    ? 'bg-white border border-slate-200 hover:border-blue-200 hover:shadow-lg'
    : 'bg-[#12122b] border border-white/10 hover:border-blue-500/30 hover:bg-[#1a1a3a]';

  return (
    <div className={`min-h-screen ${pageBg} pt-[80px]`}>
      
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden py-20 lg:py-32 flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: isLight 
            ? 'radial-gradient(circle at 50% -20%, rgba(59,130,246,0.15), transparent 60%)' 
            : 'radial-gradient(circle at 50% -20%, rgba(59,130,246,0.2), transparent 60%)'
        }} />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-blue-100 text-blue-700 mb-6">
            We're Hiring!
          </span>
          <h1 className={`text-5xl md:text-7xl font-black mb-6 ${headingCls} tracking-tight leading-tight`}>
            Build the Future of <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Enterprise Tech</span>
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${subCls}`}>
            Join a fast-growing, product-driven company. We are looking for passionate builders, thinkers, and creators who want to make a global impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => document.getElementById('open-positions').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
              View Open Positions
            </button>
            <button onClick={() => document.getElementById('internships').scrollIntoView({ behavior: 'smooth' })} className={`px-8 py-3.5 rounded-xl font-bold border transition ${isLight ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-white/20 text-white hover:bg-white/10'}`}>
              Internship Programs
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── COMPANY INTRODUCTION & WORK CULTURE ── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h2 className={`text-3xl font-black mb-6 ${headingCls}`}>Our Culture & Mission</h2>
            <p className={`text-lg mb-6 leading-relaxed ${subCls}`}>
              At Beta Softnet, our mission is to build robust SaaS solutions that fundamentally change how businesses operate. When you join our team, you'll be working on problems that matter.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-xl">🚀</div>
                <div>
                  <h4 className={`font-bold text-lg ${headingCls}`}>Innovation First</h4>
                  <p className={`text-sm ${subCls}`}>We don't settle for the status quo. We encourage experimentation and new ideas.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 text-xl">🤝</div>
                <div>
                  <h4 className={`font-bold text-lg ${headingCls}`}>Autonomy & Ownership</h4>
                  <p className={`text-sm ${subCls}`}>We hire smart people and give them the freedom to make decisions and drive projects forward.</p>
                </div>
              </li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team Collaboration" className="absolute inset-0 w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ── EMPLOYEE BENEFITS ── */}
      <section className={`py-20 px-4 ${isLight ? 'bg-white' : 'bg-[#0c0c22]'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`text-3xl font-black mb-4 ${headingCls}`}>Perks & Benefits</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`text-lg mb-16 max-w-2xl mx-auto ${subCls}`}>We invest heavily in our team so they can focus on building great products.</motion.p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {BENEFITS.map((b, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className={`p-8 rounded-2xl transition-all duration-300 ${cardBase}`}>
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className={`text-xl font-bold mb-2 ${headingCls}`}>{b.title}</h3>
                <p className={`text-sm leading-relaxed ${subCls}`}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ── */}
      <section id="open-positions" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-black mb-4 ${headingCls}`}>Open Positions</h2>
            <p className={`text-lg ${subCls}`}>Find your next big opportunity. We're actively hiring for the following roles.</p>
          </div>

          {jobs.length === 0 ? (
            <div className={`p-12 text-center rounded-3xl border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0c0c22] border-white/10'}`}>
              <p className="text-4xl mb-4">📋</p>
              <h3 className={`text-xl font-bold mb-2 ${headingCls}`}>No open positions right now</h3>
              <p className={subCls}>Check back later or drop us an email.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => {
                const title  = job.title || job.role || 'Untitled Role';
                const team   = job.team  || 'General';
                const type   = job.type  || 'Full-time';
                const loc    = job.location || '—';
                const exp    = job.experience || job.exp || '—';
                const desc   = job.description || job.desc || '';
                const salary = job.salary || '';
                const skills = Array.isArray(job.skills) ? job.skills : String(job.skills || '').split(',').map(s => s.trim()).filter(Boolean);

                return (
                  <motion.div key={job.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`rounded-2xl border p-6 lg:p-8 cursor-pointer transition-all duration-300 ${expandedJob === job.id ? (isLight ? 'border-blue-400 shadow-xl shadow-blue-100' : 'border-blue-500/60 bg-[#12122b]') : cardBase}`} onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className={`text-2xl font-bold ${headingCls}`}>{title}</h3>
                          <span className={`text-xs px-3 py-1 rounded-full font-bold ${isLight ? 'bg-blue-100 text-blue-700' : 'bg-blue-500/20 text-blue-400'}`}>{team}</span>
                        </div>
                        <div className={`flex flex-wrap gap-4 text-sm font-medium ${subCls}`}>
                          <span className="flex items-center gap-1">📍 {loc}</span>
                          <span className="flex items-center gap-1">🕒 {type}</span>
                          <span className="flex items-center gap-1">💼 {exp}</span>
                          {salary && <span className="flex items-center gap-1">💰 {salary}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={(e) => { e.stopPropagation(); setApplyJob(job); setAppSuccess(false); setAppForm({ name: '', email: '', phone: '', resume: '', experience: '', skills: '', coverLetter: '' }); }} className="px-6 py-2.5 rounded-xl font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
                          Apply Now
                        </button>
                        <svg className={`w-5 h-5 transition-transform duration-300 ${expandedJob === job.id ? 'rotate-180' : ''} ${subCls}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedJob === job.id && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-6 pt-6 border-t overflow-hidden" style={{ borderColor: isLight ? '#e2e8f0' : 'rgba(255,255,255,0.1)' }}>
                          {desc && (
                            <div className="mb-6">
                              <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${headingCls}`}>Job Description</h4>
                              <p className={`text-base leading-relaxed ${subCls}`}>{desc}</p>
                            </div>
                          )}
                          {skills.length > 0 && (
                            <div>
                              <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${headingCls}`}>Required Skills</h4>
                              <div className="flex flex-wrap gap-2">
                                {skills.map(s => <span key={s} className={`px-3 py-1.5 text-sm rounded-lg font-semibold ${isLight ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-gray-200'}`}>{s}</span>)}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── INTERNSHIP PROGRAMS ── */}
      <section id="internships" className={`py-20 px-4 ${isLight ? 'bg-slate-100' : 'bg-[#0a0a1a]'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-black mb-4 ${headingCls}`}>Internship Programs</h2>
            <p className={`text-lg ${subCls}`}>Kickstart your career with hands-on experience on real-world projects.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {internships.map((item, i) => {
              const title    = item.title    || item.role     || 'Internship';
              const team     = item.team     || 'General';
              const duration = item.duration || '—';
              const stipend  = item.stipend  || '—';
              const desc     = item.description || '';
              const skills   = Array.isArray(item.skills) ? item.skills : String(item.skills || '').split(',').map(s => s.trim()).filter(Boolean);

              return (
                <motion.div key={item.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className={`rounded-3xl p-8 ${cardBase}`}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`text-2xl font-bold ${headingCls}`}>{title}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ml-3 flex-shrink-0 ${isLight ? 'bg-purple-100 text-purple-700' : 'bg-purple-500/20 text-purple-400'}`}>{team}</span>
                  </div>
                  <div className={`flex flex-wrap gap-4 text-sm font-medium mb-4 ${subCls}`}>
                    <span>⏱ {duration}</span>
                    <span>💰 {stipend}</span>
                  </div>
                  {desc && <p className={`text-sm mb-6 leading-relaxed ${subCls}`}>{desc}</p>}
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {skills.map(s => <span key={s} className={`px-2.5 py-1 text-xs rounded-md font-semibold ${isLight ? 'bg-white border border-slate-200 text-slate-600' : 'bg-white/5 border border-white/10 text-gray-300'}`}>{s}</span>)}
                    </div>
                  )}
                  <button onClick={() => { setApplyJob(item); setAppSuccess(false); setAppForm({ name: '', email: '', phone: '', resume: '', experience: 'Intern', skills: '', coverLetter: '' }); }} className="w-full py-3 rounded-xl font-bold text-white transition-transform hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #7C3AED, #DB2777)' }}>
                    Apply for Internship
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT HR SECTION ── */}
      <section className="py-24 px-4 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`max-w-3xl mx-auto rounded-3xl p-10 md:p-16 border ${isLight ? 'bg-white border-slate-200' : 'bg-[#12122b] border-white/10'}`}>
          <div className="text-5xl mb-6">📩</div>
          <h2 className={`text-3xl font-black mb-4 ${headingCls}`}>Can't find the perfect role?</h2>
          <p className={`text-lg mb-8 ${subCls}`}>We are always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.</p>
          <a href="mailto:careers@betasoftnet.com" className="inline-block px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-transform hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
            Email HR Department
          </a>
        </motion.div>
      </section>

      {/* ── ENHANCED APPLICATION MODAL ── */}
      <AnimatePresence>
        {applyJob && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className={`w-full max-w-2xl my-8 rounded-3xl overflow-hidden shadow-2xl relative ${isLight ? 'bg-white' : 'bg-[#0f0f29] border border-white/10'}`}>
              
              <div className={`px-6 py-5 border-b flex items-center justify-between ${isLight ? 'border-slate-100 bg-slate-50/50' : 'border-white/10 bg-white/5'}`}>
                <div>
                  <h3 className={`text-xl font-bold ${headingCls}`}>Application Form</h3>
                  <p className={`text-sm ${subCls}`}>{applyJob.title || applyJob.role}</p>
                </div>
                <button onClick={() => setApplyJob(null)} className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isLight ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-white/10 text-gray-400'}`}>✕</button>
              </div>

              <div className="p-6 md:p-8">
                {appSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                    <div className="w-20 h-20 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner shadow-green-200">✓</div>
                    <h3 className={`text-2xl font-bold mb-2 ${headingCls}`}>Application Submitted Successfully</h3>
                    <p className={subCls}>Thank you for applying. Our HR team will review your profile and get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleApplySubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className={`block text-sm font-bold mb-1.5 ${headingCls}`}>Full Name *</label>
                        <input required placeholder="John Doe" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all ${isLight ? 'border-slate-200 focus:border-blue-500 focus:ring-blue-100 bg-white' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20 bg-white/5 text-white'}`} value={appForm.name} onChange={e => setAppForm(f => ({...f, name: e.target.value}))} />
                      </div>
                      <div>
                        <label className={`block text-sm font-bold mb-1.5 ${headingCls}`}>Email Address *</label>
                        <input required type="email" placeholder="john@example.com" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all ${isLight ? 'border-slate-200 focus:border-blue-500 focus:ring-blue-100 bg-white' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20 bg-white/5 text-white'}`} value={appForm.email} onChange={e => setAppForm(f => ({...f, email: e.target.value}))} />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className={`block text-sm font-bold mb-1.5 ${headingCls}`}>Phone Number *</label>
                        <input required placeholder="+91 98765 43210" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all ${isLight ? 'border-slate-200 focus:border-blue-500 focus:ring-blue-100 bg-white' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20 bg-white/5 text-white'}`} value={appForm.phone} onChange={e => setAppForm(f => ({...f, phone: e.target.value}))} />
                      </div>
                      <div>
                        <label className={`block text-sm font-bold mb-1.5 ${headingCls}`}>Years of Experience *</label>
                        <input required placeholder="e.g. 3 Years / Fresher" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all ${isLight ? 'border-slate-200 focus:border-blue-500 focus:ring-blue-100 bg-white' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20 bg-white/5 text-white'}`} value={appForm.experience} onChange={e => setAppForm(f => ({...f, experience: e.target.value}))} />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-bold mb-1.5 ${headingCls}`}>Key Skills *</label>
                      <input required placeholder="React, Node.js, Leadership..." className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all ${isLight ? 'border-slate-200 focus:border-blue-500 focus:ring-blue-100 bg-white' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20 bg-white/5 text-white'}`} value={appForm.skills} onChange={e => setAppForm(f => ({...f, skills: e.target.value}))} />
                    </div>

                    <div>
                      <label className={`block text-sm font-bold mb-1.5 ${headingCls}`}>Resume / Portfolio Link *</label>
                      <input required type="url" placeholder="https://linkedin.com/in/johndoe or Google Drive link" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all ${isLight ? 'border-slate-200 focus:border-blue-500 focus:ring-blue-100 bg-white' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20 bg-white/5 text-white'}`} value={appForm.resume} onChange={e => setAppForm(f => ({...f, resume: e.target.value}))} />
                    </div>

                    <div>
                      <label className={`block text-sm font-bold mb-1.5 ${headingCls}`}>Cover Letter / Message</label>
                      <textarea rows={4} placeholder="Why are you a good fit?" className={`w-full px-4 py-3 rounded-xl border resize-none focus:ring-2 focus:outline-none transition-all ${isLight ? 'border-slate-200 focus:border-blue-500 focus:ring-blue-100 bg-white' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20 bg-white/5 text-white'}`} value={appForm.coverLetter} onChange={e => setAppForm(f => ({...f, coverLetter: e.target.value}))} />
                    </div>

                    <div className="pt-4">
                      <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl text-lg font-bold text-white shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed" style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)' }}>
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
