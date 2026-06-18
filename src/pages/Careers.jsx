import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, THEMES } from '../context/ThemeContext';

const JOBS = [
  { id:1, role:'Senior Full-Stack Developer', team:'Engineering', type:'Full-time', location:'Remote', exp:'5+ years', skills:['React','Node.js','PostgreSQL','Docker'], desc:'Build and maintain scalable web applications across our product suite.' },
  { id:2, role:'React Native Developer', team:'Engineering', type:'Full-time', location:'Remote', exp:'3+ years', skills:['React Native','JavaScript','iOS','Android'], desc:'Develop cross-platform mobile apps for our healthcare and education products.' },
  { id:3, role:'Backend Developer (Python)', team:'Engineering', type:'Full-time', location:'Remote', exp:'4+ years', skills:['Python','Django','REST APIs','AWS'], desc:'Design and build robust APIs powering our enterprise platforms.' },
  { id:4, role:'DevOps Engineer', team:'Infrastructure', type:'Full-time', location:'Remote', exp:'4+ years', skills:['Kubernetes','CI/CD','Terraform','Linux'], desc:'Own deployment pipelines and cloud infrastructure across product environments.' },
  { id:5, role:'UI/UX Product Designer', team:'Design', type:'Full-time', location:'Remote', exp:'4+ years', skills:['Figma','Design Systems','User Research','Prototyping'], desc:'Lead product design from research to pixel-perfect delivery across Beta products.' },
  { id:6, role:'Business Development Manager', team:'Sales', type:'Full-time', location:'Chennai', exp:'5+ years', skills:['B2B Sales','CRM','Negotiation','Client Management'], desc:'Drive enterprise sales for Beta Softnet ERP, CRM and vertical products.' },
];

const INTERNSHIPS = [
  { id:1, role:'Frontend Developer Intern', team:'Engineering', duration:'6 months', stipend:'₹15,000/mo', skills:['React','Tailwind CSS','JavaScript'] },
  { id:2, role:'Backend Developer Intern', team:'Engineering', duration:'6 months', stipend:'₹15,000/mo', skills:['Node.js','MySQL','REST APIs'] },
  { id:3, role:'UI Design Intern', team:'Design', duration:'3 months', stipend:'₹10,000/mo', skills:['Figma','Adobe XD','Prototyping'] },
  { id:4, role:'Digital Marketing Intern', team:'Marketing', duration:'3 months', stipend:'₹8,000/mo', skills:['SEO','Social Media','Content Writing'] },
];

const BENEFITS = [
  { icon:'🌍', title:'Remote-First', desc:'Work from anywhere. We have team members across India and beyond.' },
  { icon:'📈', title:'Career Growth', desc:'Structured growth plans, mentorship, and fast promotions for performers.' },
  { icon:'🎓', title:'Learning Budget', desc:'₹20,000 per year for courses, certifications and technical conferences.' },
  { icon:'🏖️', title:'Flexible PTO', desc:'We trust you to manage your time. Take the rest you need to perform.' },
  { icon:'💊', title:'Health Insurance', desc:'Comprehensive medical insurance covering you and your immediate family.' },
  { icon:'💻', title:'Work Equipment', desc:'MacBook or high-spec laptop + accessories provided from day one.' },
];

const SIDE_ITEMS = [
  { key:'jobs',         label:'Open Jobs',    icon:'💼' },
  { key:'internships',  label:'Internships',  icon:'🎓' },
  { key:'benefits',     label:'Benefits',     icon:'🎁' },
];

const fadeUp = { hidden:{opacity:0,y:14}, visible:(i)=>({opacity:1,y:0,transition:{delay:i*0.06,duration:0.32}}) };

export default function Careers() {
  const { theme } = useTheme();
  const isLight = theme === THEMES.VISION;
  const [section, setSection] = useState('jobs');
  const [expandedJob, setExpandedJob] = useState(null);

  const pageBg    = isLight ? 'bg-slate-50'   : 'bg-[#07071a]';
  const sidebarBg = isLight ? 'bg-white border-r border-slate-200' : 'bg-[#0c0c22] border-r border-white/8';
  const headingCls= isLight ? 'text-slate-900' : 'text-white';
  const subCls    = isLight ? 'text-slate-500' : 'text-gray-400';
  const cardBase  = isLight ? 'bg-white border border-slate-200 hover:border-blue-200 hover:shadow-md' : 'bg-white/5 border border-white/8 hover:border-blue-500/30 hover:bg-white/8';

  return (
    <div className={`min-h-screen ${pageBg} pt-[62px]`}>
      {/* Header */}
      <div className={`border-b px-6 py-5 ${isLight ? 'bg-white border-slate-200' : 'bg-[#0c0c22] border-white/8'}`}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-500 mb-1">We're Hiring</p>
          <h1 className={`text-2xl font-black ${headingCls}`}>Careers at Beta Softnet</h1>
          <p className={`text-sm mt-1 ${subCls}`}>Join us in building enterprise software that transforms industries.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex" style={{ minHeight: 'calc(100vh - 130px)' }}>
        {/* Sidebar */}
        <aside className={`w-56 flex-shrink-0 sticky top-[62px] self-start ${sidebarBg}`} style={{ height: 'calc(100vh - 130px)' }}>
          <div className="py-4">
            <p className={`px-5 py-2 text-[10px] font-bold tracking-[0.3em] uppercase ${isLight ? 'text-slate-400' : 'text-gray-600'}`}>Navigation</p>
            {SIDE_ITEMS.map(({ key, label, icon }) => (
              <button key={key} type="button" onClick={() => setSection(key)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-all duration-150 text-left border-r-2
                  ${section === key
                    ? isLight ? 'bg-blue-50 text-blue-700 border-blue-500' : 'bg-blue-500/12 text-blue-300 border-blue-400'
                    : isLight ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent' : 'text-gray-400 hover:bg-white/5 hover:text-white border-transparent'}`}>
                <span>{icon}</span>{label}
                {section === key && <svg className="w-3.5 h-3.5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>}
              </button>
            ))}
          </div>
          {/* Contact */}
          <div className={`mx-4 mt-4 p-4 rounded-2xl ${isLight ? 'bg-blue-50 border border-blue-100' : 'bg-blue-500/10 border border-blue-500/20'}`}>
            <p className="text-xs font-bold text-blue-600 mb-1">Open Application</p>
            <p className={`text-xs mb-2 ${subCls}`}>Don't see your role?</p>
            <a href="mailto:santhoshp232004@gmail.com?subject=Career Application"
              className="text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors">
              Email Us →
            </a>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">

            {section === 'jobs' && (
              <motion.div key="jobs" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.22}}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className={`text-xl font-black ${headingCls}`}>Open Positions <span className="text-blue-500">({JOBS.length})</span></h2>
                </div>
                <div className="space-y-3">
                  {JOBS.map((job, i) => (
                    <motion.div key={job.id} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                      className={`rounded-2xl border p-5 transition-all duration-200 cursor-pointer ${expandedJob === job.id ? (isLight ? 'border-blue-300 shadow-lg shadow-blue-50' : 'border-blue-500/40') : cardBase}`}
                      onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className={`text-base font-bold ${headingCls}`}>{job.role}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${isLight ? 'bg-blue-50 text-blue-600' : 'bg-blue-500/15 text-blue-400'}`}>{job.team}</span>
                          </div>
                          <div className={`flex flex-wrap gap-3 text-xs ${subCls}`}>
                            <span>📍 {job.location}</span>
                            <span>🕒 {job.type}</span>
                            <span>💼 {job.exp}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a href="mailto:santhoshp232004@gmail.com?subject=Job Application"
                            onClick={e => e.stopPropagation()}
                            className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                            style={{ background:'linear-gradient(135deg,#3B82F6,#8B5CF6)' }}>
                            Apply
                          </a>
                          <svg className={`w-4 h-4 transition-transform ${expandedJob === job.id ? 'rotate-180' : ''} ${subCls}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                          </svg>
                        </div>
                      </div>
                      {expandedJob === job.id && (
                        <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
                          className="mt-4 pt-4 border-t" style={{ borderColor: isLight ? '#e2e8f0' : 'rgba(255,255,255,0.08)' }}>
                          <p className={`text-sm mb-3 ${subCls}`}>{job.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map(s => (
                              <span key={s} className={`px-2.5 py-1 text-xs rounded-lg font-medium ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-gray-300'}`}>{s}</span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {section === 'internships' && (
              <motion.div key="internships" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.22}}>
                <h2 className={`text-xl font-black mb-5 ${headingCls}`}>Internship Programs</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {INTERNSHIPS.map((item, i) => (
                    <motion.div key={item.id} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                      className={`rounded-2xl border p-5 ${cardBase}`}>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className={`text-base font-bold ${headingCls}`}>{item.role}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${isLight ? 'bg-violet-50 text-violet-600' : 'bg-violet-500/15 text-violet-400'}`}>{item.team}</span>
                      </div>
                      <div className={`flex gap-4 text-xs mb-3 ${subCls}`}>
                        <span>⏱ {item.duration}</span>
                        <span>💰 {item.stipend}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.skills.map(s => (
                          <span key={s} className={`px-2 py-0.5 text-xs rounded-md ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/8 text-gray-300'}`}>{s}</span>
                        ))}
                      </div>
                      <a href="mailto:santhoshp232004@gmail.com?subject=Internship Application"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                        style={{ background:'linear-gradient(135deg,#8B5CF6,#7C3AED)' }}>
                        Apply Now
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {section === 'benefits' && (
              <motion.div key="benefits" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.22}}>
                <h2 className={`text-xl font-black mb-2 ${headingCls}`}>Employee Benefits</h2>
                <p className={`text-sm mb-6 ${subCls}`}>We invest in people who invest in building great products.</p>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {BENEFITS.map(({ icon, title, desc }, i) => (
                    <motion.div key={title} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                      className={`rounded-2xl border p-5 ${cardBase}`}>
                      <div className="text-3xl mb-3">{icon}</div>
                      <h3 className={`text-base font-bold mb-1.5 ${headingCls}`}>{title}</h3>
                      <p className={`text-sm leading-relaxed ${subCls}`}>{desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
