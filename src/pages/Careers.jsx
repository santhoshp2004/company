import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme, THEMES } from '../context/ThemeContext';

const jobs = [
  {
    id: 1,
    role: 'Senior Frontend Developer',
    team: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    experience: '5+ years',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'REST APIs'],
    description: 'Build high-quality, performant user interfaces for USEMETA digital products. Collaborate closely with product and design teams to deliver outstanding web experiences.',
  },
  {
    id: 2,
    role: 'Backend Developer (Node.js)',
    team: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    experience: '4+ years',
    skills: ['Node.js', 'PostgreSQL', 'REST APIs', 'Cloud Services'],
    description: 'Design and build scalable backend services and APIs powering USEMETA products. Own service reliability, performance, and security.',
  },
  {
    id: 3,
    role: 'Full-Stack Developer',
    team: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
    skills: ['React', 'Node.js', 'Databases', 'Cloud Platforms'],
    description: 'Contribute across the full software stack — from user-facing web applications to backend services and cloud deployments.',
  },
  {
    id: 4,
    role: 'Product Designer',
    team: 'Design',
    location: 'Remote',
    type: 'Full-time',
    experience: '4+ years',
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
    description: 'Lead product design for USEMETA — crafting clear, intuitive experiences from initial research to polished, pixel-perfect delivery.',
  },
  {
    id: 5,
    role: 'Mobile Developer (React Native)',
    team: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
    skills: ['React Native', 'JavaScript', 'iOS', 'Android'],
    description: 'Build and maintain high-quality mobile applications for USEMETA products across iOS and Android platforms.',
  },
  {
    id: 6,
    role: 'Business Operations Manager',
    team: 'Operations',
    location: 'Remote',
    type: 'Full-time',
    experience: '4+ years',
    skills: ['Project Management', 'Operations', 'Client Relations', 'Process Improvement'],
    description: 'Manage day-to-day business operations, client relationships, and internal processes to ensure USEMETA runs efficiently at scale.',
  },
];

const values = [
  { icon: '🚀', title: 'Ship Quality Software',   desc: 'We build fast, but never compromise on quality, security, or user experience.' },
  { icon: '🌍', title: 'Remote-First Team',        desc: 'Work from anywhere. We have team members across multiple time zones.' },
  { icon: '🤝', title: 'Open Communication',       desc: 'Strategy, metrics, and roadmap are shared openly. No silos, no surprises.' },
  { icon: '🌱', title: 'Learning & Development',   desc: 'Dedicated budget for professional growth — courses, books, and conferences.' },
  { icon: '🏖️', title: 'Flexible Time Off',       desc: 'We trust you to manage your time responsibly. Take the rest you need.' },
  { icon: '💼', title: 'Meaningful Work',           desc: 'Build products that real organisations depend on every day.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function Careers() {
  const { theme, t }    = useTheme();
  const isLight         = theme === THEMES.VISION;
  const [team, setTeam] = useState('All');

  const teams    = ['All', ...new Set(jobs.map((j) => j.team))];
  const filtered = team === 'All' ? jobs : jobs.filter((j) => j.team === team);

  const headingCls = isLight ? 'text-slate-900' : 'text-white';
  const subTxtCls  = isLight ? 'text-slate-600' : 'text-gray-400';
  const mutedCls   = isLight ? 'text-slate-400' : 'text-gray-600';
  const cardCls    = isLight ? 'bg-white/70 backdrop-blur-xl border border-slate-200/80' : 'bg-white/5 backdrop-blur-md border border-white/10';
  const pillActive = 'text-white shadow-lg';
  const pillInactive= isLight
    ? 'bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200'
    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white';

  return (
    <main className="min-h-screen pt-24 pb-20" style={t.pageBgStyle}>
      <div className="section-container">

        {/* Hero */}
        <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={fadeUp}>
          <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${isLight?'text-blue-600':'text-primary-400'}`}>Join Our Team</p>
          <h1 className={`text-5xl sm:text-6xl font-black leading-tight mb-4 ${headingCls}`}>
            Build Software Products<br/>
            <span className={t.gradientText}>That Make A Difference</span>
          </h1>
          <p className={`text-lg max-w-xl mx-auto ${subTxtCls}`}>
            Join USEMETA and help build reliable digital products that organisations worldwide depend on every day.
          </p>
          <div className={`mt-4 text-sm ${mutedCls}`}>
            Apply via: <a href="mailto:santhoshp232004@gmail.com" className={`font-medium ${isLight?'text-blue-600':'text-blue-400'} hover:underline`}>santhoshp232004@gmail.com</a>
          </div>
        </motion.div>

        {/* Culture values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {values.map(({ icon, title, desc }, i) => (
            <motion.div key={title} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}
              style={{transitionDelay:`${i*0.07}s`}}
              className={`${cardCls} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group`}>
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className={`text-base font-bold mb-1.5 ${headingCls}`}>{title}</h3>
              <p className={`text-sm leading-relaxed ${subTxtCls}`}>{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Open roles */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className={`text-3xl font-black ${headingCls}`}>Open Positions</h2>
              <p className={`mt-1 text-sm ${mutedCls}`}>{filtered.length} role{filtered.length !== 1 ? 's' : ''} available</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {teams.map((t) => (
                <button key={t} onClick={() => setTeam(t)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200 ${team===t ? pillActive : pillInactive}`}
                  style={team===t ? {background:'linear-gradient(135deg,#3B82F6,#8B5CF6)'} : {}}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map(({ id, role, team: jobTeam, location, type, experience, skills, description }) => (
              <motion.div key={id} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}
                className={`${cardCls} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 group`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className={`text-lg font-bold ${headingCls}`}>{role}</h3>
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${isLight?'bg-slate-100 text-slate-500':'bg-white/5 text-gray-400'}`}>{jobTeam}</span>
                    </div>
                    <p className={`text-sm leading-relaxed mb-3 max-w-2xl ${subTxtCls}`}>{description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {skills.map((s) => (
                        <span key={s} className={`px-2.5 py-1 text-xs font-medium rounded-lg ${isLight?'bg-blue-50 text-blue-600 border border-blue-100':'bg-primary-500/15 text-primary-400 border border-primary-500/30'}`}>{s}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs" style={{color:isLight?'#94a3b8':'#6b7280'}}>
                      {[{icon:'📍',text:location},{icon:'🕐',text:type},{icon:'💼',text:experience}].map(({icon,text})=>(
                        <span key={text} className="flex items-center gap-1.5">{icon} {text}</span>
                      ))}
                    </div>
                  </div>
                  <a href="mailto:santhoshp232004@gmail.com?subject=Job Application"
                    className="flex-shrink-0 self-start lg:self-center px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5"
                    style={{background:'linear-gradient(135deg,#3B82F6,#8B5CF6)'}}>
                    Apply Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div className={`mt-20 ${cardCls} rounded-3xl p-10 text-center`} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
          <h2 className={`text-3xl font-black mb-3 ${headingCls}`}>Don't see your role?</h2>
          <p className={`mb-4 ${subTxtCls}`}>We're always open to hearing from talented people. Send us your details.</p>
          <p className={`text-sm mb-6 ${mutedCls}`}>Email: santhoshp232004@gmail.com · Phone: +91 9976017966</p>
          <a href="mailto:santhoshp232004@gmail.com?subject=Open Application"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all duration-300 hover:-translate-y-0.5
              ${isLight?'bg-white border-slate-200 text-slate-700 hover:border-blue-300':'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}>
            Send Open Application
          </a>
        </motion.div>

      </div>
    </main>
  );
}
