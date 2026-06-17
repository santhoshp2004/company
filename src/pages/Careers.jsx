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
  { icon: '🚀', title: 'Ship Quality Software', desc: 'We build fast, but never compromise on quality, security, or user experience.' },
  { icon: '🌍', title: 'Remote-First Team', desc: 'Work from anywhere. We have team members across multiple time zones.' },
  { icon: '🤝', title: 'Open Communication', desc: 'Strategy, metrics, and roadmap are shared openly. No silos, no surprises.' },
  { icon: '🌱', title: 'Learning & Development', desc: 'Dedicated budget for professional growth — courses, books, and conferences.' },
  { icon: '🏖️', title: 'Flexible Time Off', desc: 'We trust you to manage your time responsibly. Take the rest you need.' },
  { icon: '💼', title: 'Meaningful Work', desc: 'Build products that real organisations depend on every day.' },
];

const process = [
  { step: 'Apply', detail: 'Submit your role interest and tell us how you want to contribute at USEMETA.' },
  { step: 'Interview', detail: 'Discuss the role, team fit, and product vision with hiring stakeholders.' },
  { step: 'Offer', detail: 'Receive a clear role offer with growth expectations, compensation, and team alignment.' },
  { step: 'Onboard', detail: 'Join with a dedicated onboarding plan, mentorship, and early product engagement.' },
];

const testimonials = [
  { name: 'Aisha', role: 'Senior Engineer', quote: 'USEMETA gave me ownership of meaningful work and the support to grow fast.', highlight: 'Focus on impact over busywork.' },
  { name: 'Rohit', role: 'Product Designer', quote: 'Our team prioritises clarity and quality. I love the collaborative culture here.', highlight: 'Design is part of every decision.' },
  { name: 'Maya', role: 'Operations Manager', quote: 'The company values people and process equally. It feels like a place built for long-term success.', highlight: 'Work-life balance is real.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function Careers() {
  const { theme, t } = useTheme();
  const isLight = theme === THEMES.VISION;
  const [team, setTeam] = useState('All');

  const teams = ['All', ...new Set(jobs.map((job) => job.team))];
  const filtered = team === 'All' ? jobs : jobs.filter((job) => job.team === team);

  const headingCls = isLight ? 'text-slate-900' : 'text-white';
  const subTxtCls = isLight ? 'text-slate-600' : 'text-gray-400';
  const cardCls = isLight ? 'bg-white/80 backdrop-blur-xl border border-slate-200/80' : 'bg-white/5 backdrop-blur-md border border-white/10';

  return (
    <main className="min-h-screen pt-24 pb-20" style={t.pageBgStyle}>
      <div className="section-container">

        <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={fadeUp}>
          <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${isLight ? 'text-blue-600' : 'text-primary-400'}`}>Join Our Team</p>
          <h1 className={`text-5xl sm:text-6xl font-black leading-tight mb-4 ${headingCls}`}>
            Build software products<br />
            <span className={t.gradientText}>that make a difference.</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${subTxtCls}`}>
            Join USEMETA and help create reliable digital products used by organisations around the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {values.map((value, index) => (
            <motion.div key={value.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ transitionDelay: `${index * 0.06}s` }}
              className={`${cardCls} rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1`}>
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className={`text-xl font-bold mb-3 ${headingCls}`}>{value.title}</h3>
              <p className={`text-sm leading-relaxed ${subTxtCls}`}>{value.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className={`text-3xl font-black ${headingCls}`}>Open Opportunities</h2>
            <p className={`text-sm ${subTxtCls}`}>{filtered.length} role{filtered.length !== 1 ? 's' : ''} available</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {teams.map((teamName) => (
              <button key={teamName} onClick={() => setTeam(teamName)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${teamName === team ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20' : isLight ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100' : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'}`}>
                {teamName}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 mb-20">
          {filtered.map((job) => (
            <motion.div key={job.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className={`${cardCls} rounded-3xl p-7 transition-all duration-300 hover:-translate-y-0.5`}>
              <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 items-center">
                    <h3 className={`text-xl font-bold ${headingCls}`}>{job.role}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-primary-500/20">{job.team}</span>
                  </div>
                  <p className={`text-sm ${subTxtCls}`}>{job.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                    <span>📍 {job.location}</span>
                    <span>🕒 {job.type}</span>
                    <span>💼 {job.experience}</span>
                  </div>
                </div>
                <a href="mailto:santhoshp232004@gmail.com?subject=Job Application"
                  className="self-start px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-violet-500 transition-all hover:-translate-y-0.5">
                  Apply Now
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-200">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`${cardCls} rounded-3xl p-8`}>
            <h2 className={`text-3xl font-black mb-4 ${headingCls}`}>Recruitment Timeline</h2>
            <div className="space-y-4">
              {process.map((item, index) => (
                <div key={item.step} className="rounded-3xl p-5 bg-white/5 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.28em] text-primary-400 mb-2">Step {index + 1}</p>
                  <h3 className={`text-lg font-bold ${headingCls}`}>{item.step}</h3>
                  <p className={`text-sm leading-relaxed ${subTxtCls}`}>{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`${cardCls} rounded-3xl p-8`}>
            <h2 className={`text-3xl font-black mb-4 ${headingCls}`}>Life At USEMETA</h2>
            <p className={`text-sm leading-relaxed ${subTxtCls} mb-6`}>
              We invest in people, collaboration, and growth. Our culture is built around open communication, continuous improvement, and meaningful product work.
            </p>
            <div className="grid gap-4">
              {['Flexible work model', 'Mentorship and career progression', 'Company-wide learning budget', 'Quarterly team growth sessions'].map((item) => (
                <div key={item} className="rounded-3xl p-5 bg-white/5 border border-white/10">
                  <p className={`text-sm leading-relaxed ${subTxtCls}`}>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mb-20">
          <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className={`text-3xl font-black mb-2 ${headingCls}`}>Employee Testimonials</h2>
            <p className={subTxtCls}>Hear from people who are growing with USEMETA.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                style={{ transitionDelay: `${index * 0.06}s` }}
                className={`${cardCls} rounded-3xl p-7`}>
                <p className="text-xl font-semibold text-white mb-2">“{testimonial.quote}”</p>
                <p className={`text-sm ${subTxtCls} mb-4`}>{testimonial.highlight}</p>
                <p className="text-sm font-bold text-white">{testimonial.name}</p>
                <p className={`text-xs ${subTxtCls}`}>{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className={`${cardCls} rounded-3xl p-10 text-center`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className={`text-3xl font-black mb-4 ${headingCls}`}>Don’t see your role yet?</h2>
          <p className={`text-sm leading-relaxed mb-6 ${subTxtCls}`}>
            We’re always looking for great talent. Send us your resume and tell us how you want to contribute.
          </p>
          <a href="mailto:santhoshp232004@gmail.com?subject=Open Application"
            className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold transition-all hover:-translate-y-0.5">
            Send Open Application
          </a>
        </motion.div>
      </div>
    </main>
  );
}
