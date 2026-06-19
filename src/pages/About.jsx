import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, THEMES } from '../context/ThemeContext';

const SIDE_ITEMS = [
  { key:'overview',    label:'Company Overview', icon:'🏢' },
  { key:'vision',      label:'Vision',           icon:'🔭' },
  { key:'mission',     label:'Mission',          icon:'🎯' },
  { key:'values',      label:'Core Values',      icon:'✨' },
  { key:'leadership',  label:'Leadership',       icon:'👤' },
  { key:'global',      label:'Global Presence',  icon:'🌍' },
];

const MILESTONES = [
  { year:'2021', title:'Beta Softnet Founded', desc:'Santhosh founded Beta Softnet with a mission to deliver enterprise-grade software to Indian businesses at accessible pricing.' },
  { year:'2022', title:'First Products Launched', desc:'Beta ERP and Beta HRMS went live. First 50 customers onboarded across manufacturing and retail sectors.' },
  { year:'2023', title:'Education Vertical Launched', desc:'Beta School ERP and Beta LMS released. Crossed 20,000 student records managed across 30 institutions.' },
  { year:'2024', title:'Healthcare Suite Released', desc:'Beta HMS, Beta Clinic and Beta Lab launched. Expanded to hospitals and clinic chains across South India.' },
  { year:'2025', title:'10,000+ Users Milestone', desc:'Reached 10,000+ active users across all products. Expanded partner network to 50+ implementation partners.' },
  { year:'2026', title:'Finance Suite Completed', desc:'Beta Accounts, Beta Payroll, Beta Billing and Beta Audit launched. Full enterprise suite now available.' },
];

const TEAM = [
  { name:'Santhosh', role:'Founder & CEO', avatar:'S', color:'from-blue-500 to-indigo-600', bio:'Entrepreneur and software architect with a vision to make enterprise software accessible to every Indian business.' },
  { name:'Product Team', role:'Product & Design', avatar:'P', color:'from-violet-500 to-purple-600', bio:'Crafting user experiences across all Beta Softnet products — from enterprise ERP to mobile-first education tools.' },
  { name:'Engineering', role:'Software Development', avatar:'E', color:'from-cyan-500 to-blue-600', bio:'Full-stack engineers building scalable, secure, and reliable software solutions for enterprise customers.' },
  { name:'Customer Success', role:'Implementation & Support', avatar:'C', color:'from-emerald-500 to-teal-600', bio:'Ensuring every customer gets maximum value from Beta Softnet products through dedicated onboarding and support.' },
];

const VALUES = [
  { icon:'🔒', title:'Trust & Reliability', desc:'We build software our customers can depend on — high uptime, data security, and compliance at the core.' },
  { icon:'🇮🇳', title:'Made for India', desc:'Every product is designed with Indian business workflows, GST compliance, and regional requirements in mind.' },
  { icon:'⚡', title:'Continuous Innovation', desc:'We ship improvements constantly based on real customer feedback and evolving business needs.' },
  { icon:'🤝', title:'Customer-First Culture', desc:'Our customers\' success is our success. We measure outcomes, not just outputs.' },
];

const STATS = [
  { v:'10K+', l:'Active Users' },  { v:'80+', l:'Industries' },
  { v:'6',    l:'Product Suites' }, { v:'99.9%', l:'Uptime SLA' },
  { v:'50+',  l:'Partners' },       { v:'2021',  l:'Founded' },
];

const fadeUp = { hidden:{opacity:0,y:14}, visible:(i)=>({opacity:1,y:0,transition:{delay:i*0.07,duration:0.35}}) };

export default function About() {
  const { theme } = useTheme();
  const isLight = theme === THEMES.VISION;
  const [section, setSection] = useState('overview');

  const pageBg     = isLight ? 'bg-slate-50'   : 'bg-[#07071a]';
  const sidebarBg  = isLight ? 'bg-white border-r border-slate-200' : 'bg-[#0c0c22] border-r border-white/8';
  const headingCls = isLight ? 'text-slate-900' : 'text-white';
  const subCls     = isLight ? 'text-slate-500' : 'text-gray-400';
  const cardBase   = isLight ? 'bg-white border border-slate-200' : 'bg-white/5 border border-white/8';

  return (
    <div className={`min-h-screen ${pageBg} pt-[62px]`}>
      {/* Header */}
      <div className={`border-b px-6 py-5 ${isLight ? 'bg-white border-slate-200' : 'bg-[#0c0c22] border-white/8'}`}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-500 mb-1">Who We Are</p>
          <h1 className={`text-2xl font-black ${headingCls}`}>About Beta Softnet</h1>
          <p className={`text-sm mt-1 ${subCls}`}>We are a technology-driven company dedicated to delivering...</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row" style={{ minHeight:'calc(100vh - 130px)' }}>
        {/* Sidebar */}
        <aside className={`w-full md:w-56 flex-shrink-0 md:sticky md:top-[62px] self-start z-10 ${sidebarBg}`} style={{ maxHeight:'calc(100vh - 130px)' }}>
          <div className="py-4 flex md:flex-col overflow-x-auto no-scrollbar border-b md:border-b-0 border-slate-200">
            <p className={`px-5 py-2 hidden md:block text-[10px] font-bold tracking-[0.3em] uppercase ${isLight ? 'text-slate-400' : 'text-gray-600'}`}>Company</p>
            {SIDE_ITEMS.map(({ key, label, icon }) => (
              <button key={key} type="button" onClick={() => setSection(key)}
                className={`flex-shrink-0 md:w-full flex items-center justify-center md:justify-start gap-2 md:gap-3 px-4 md:px-5 py-3 md:py-3.5 text-sm font-semibold transition-all duration-150 text-left md:border-r-2 border-b-2 md:border-b-0
                  ${section === key
                    ? isLight ? 'bg-blue-50 text-blue-700 border-blue-500' : 'bg-blue-500/12 text-blue-300 border-blue-400'
                    : isLight ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent' : 'text-gray-400 hover:bg-white/5 hover:text-white border-transparent'}`}>
                <span>{icon}</span><span className="whitespace-nowrap">{label}</span>
                {section === key && <svg className="w-3.5 h-3.5 ml-auto hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>}
              </button>
            ))}
          </div>
          <div className={`mx-4 mt-3 p-3 rounded-2xl hidden md:block ${isLight ? 'bg-blue-50 border border-blue-100' : 'bg-blue-500/10 border border-blue-500/20'}`}>
            <p className="text-xs font-bold text-blue-600 mb-1">Get in Touch</p>
            <a href="mailto:santhoshp232004@gmail.com" className="text-xs text-blue-500 hover:text-blue-600 block break-all">santhoshp232004@gmail.com</a>
            <a href="tel:9976017966" className="text-xs text-blue-500 hover:text-blue-600 block mt-0.5">+91 9976017966</a>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">

            {section === 'overview' && (
              <motion.div key="overview" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.22}}>
                {/* Founder message */}
                <motion.div className={`rounded-2xl border p-6 mb-6 ${cardBase}`} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.05}}>
                  <p className="text-xs font-bold tracking-[0.25em] uppercase text-blue-500 mb-2">From the Founder</p>
                  <h2 className={`text-lg font-black mb-3 ${headingCls}`}>A message from Santhosh</h2>
                  <p className={`text-sm leading-relaxed mb-3 ${subCls}`}>
                    Beta Softnet was founded to solve a real problem: Indian businesses deserve enterprise-grade software that actually understands how they work — GST compliance, regional workflows, multi-branch operations, and more.
                  </p>
                  <p className={`text-sm leading-relaxed ${subCls}`}>
                    Every product we build starts with a customer problem and ends with a measurable outcome. We are proud to serve businesses across healthcare, education, manufacturing, and finance sectors nationwide.
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white" style={{ background:'linear-gradient(135deg,#3B82F6,#8B5CF6)' }}>S</div>
                    <div>
                      <p className={`text-sm font-bold ${headingCls}`}>Santhosh</p>
                      <p className={`text-xs ${subCls}`}>Founder & CEO, Beta Softnet Private Limited</p>
                    </div>
                  </div>
                </motion.div>

                {/* Stats */}
                <div className={`rounded-2xl border p-6 mb-6 ${cardBase}`}>
                  <h3 className={`text-base font-bold mb-4 ${headingCls}`}>Company at a Glance</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    {STATS.map(({ v, l }, i) => (
                      <motion.div key={l} custom={i} variants={fadeUp} initial="hidden" animate="visible" className="text-center">
                        <p className="text-2xl font-black text-blue-500">{v}</p>
                        <p className={`text-xs mt-0.5 ${subCls}`}>{l}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* ════════════ TIMELINE ════════════ */}
                <h3 className={`text-base font-bold mb-8 ${headingCls}`}>Our Journey</h3>

                {/* Outer wrapper — positions the vertical line */}
                <div className="relative pl-0 md:pl-0">

                  {/* ── Vertical spine: 4 px · dark-blue gradient · shadow ── */}
                  <div
                    aria-hidden="true"
                    className="absolute left-[9px] md:left-1/2 transform -translate-x-0 md:-translate-x-1/2 top-0 bottom-0 w-[4px] rounded-full"
                    style={{
                      background: 'linear-gradient(180deg,#0F172A 0%,#1E3A8A 20%,#1D4ED8 50%,#2563EB 75%,#3B82F6 100%)',
                      boxShadow: '0 0 0 1px rgba(30,58,138,0.18), 0 0 12px 3px rgba(30,58,138,0.40), 0 4px 24px rgba(37,99,235,0.25)',
                    }}
                  />

                  <div className="space-y-12 md:space-y-16">
                    {MILESTONES.map(({ year, title, desc }, i) => {
                      const isEven = i % 2 === 0;
                      const card = (
                        <motion.div
                          whileHover={{ y: -2, boxShadow: isLight ? '0 8px 32px rgba(30,58,138,0.12)' : '0 8px 32px rgba(30,58,138,0.35)' }}
                          transition={{ duration: 0.2 }}
                          className={[
                            'w-full max-w-lg rounded-2xl border p-5 transition-colors duration-200 cursor-default text-left',
                            isLight
                              ? 'bg-white border-slate-200 hover:border-blue-200'
                              : 'bg-[#0f0f2d] border-white/8 hover:border-blue-500/40',
                          ].join(' ')}
                        >
                          {/* Year badge */}
                          <span
                            className="inline-block mb-2 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase"
                            style={{
                              background: isLight
                                ? 'linear-gradient(135deg,#EFF6FF,#DBEAFE)'
                                : 'linear-gradient(135deg,rgba(30,58,138,0.4),rgba(37,99,235,0.3))',
                              color: isLight ? '#1D4ED8' : '#93C5FD',
                              border: isLight ? '1px solid #BFDBFE' : '1px solid rgba(59,130,246,0.3)',
                            }}
                          >
                            {year}
                          </span>

                          <p className={`text-sm font-bold leading-snug mb-1.5 ${headingCls}`}>{title}</p>
                          <p className={`text-xs leading-relaxed ${subCls}`}>{desc}</p>
                        </motion.div>
                      );

                      return (
                        <motion.div
                          key={year}
                          custom={i}
                          variants={fadeUp}
                          initial="hidden"
                          animate="visible"
                          className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full items-start"
                        >
                          {/* ── Timeline dot: 20 px · dark-blue fill · white border · glow ── */}
                          <motion.div
                            whileHover={{ scale: 1.3 }}
                            transition={{ type: 'spring', stiffness: 460, damping: 16 }}
                            aria-hidden="true"
                            className="absolute left-[1px] md:left-1/2 transform -translate-x-0 md:-translate-x-1/2 w-[20px] h-[20px] rounded-full z-10"
                            style={{
                              top: '24px',
                              background: 'linear-gradient(135deg,#0F172A 0%,#1E3A8A 45%,#2563EB 100%)',
                              border: '3px solid #ffffff',
                              outline: '2px solid #1D4ED8',
                              outlineOffset: '1px',
                              boxShadow: [
                                '0 0 0 4px rgba(30,58,138,0.15)',
                                '0 0 14px 4px rgba(29,78,216,0.55)',
                                '0 4px 16px rgba(0,0,0,0.28)',
                              ].join(','),
                              cursor: 'default',
                            }}
                          >
                            {/* Pulse ring — only on first/last dot for visual interest */}
                            {(i === 0 || i === MILESTONES.length - 1) && (
                              <span
                                className="absolute rounded-full animate-ping"
                                style={{
                                  inset: '-4px',
                                  background: 'rgba(37,99,235,0.22)',
                                  animationDuration: '2.8s',
                                }}
                              />
                            )}
                          </motion.div>

                          {isEven ? (
                            <>
                              {/* Left side card */}
                              <div className="pl-8 md:pl-0 md:pr-8 flex justify-start md:justify-end w-full">
                                {card}
                              </div>
                              {/* Spacer for right side on desktop */}
                              <div className="hidden md:block" />
                            </>
                          ) : (
                            <>
                              {/* Spacer for left side on desktop */}
                              <div className="hidden md:block" />
                              {/* Right side card */}
                              <div className="pl-8 md:pl-8 flex justify-start w-full">
                                {card}
                              </div>
                            </>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {section === 'mission' && (
              <motion.div key="mission" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.22}}>
                <h2 className={`text-xl font-black mb-6 ${headingCls}`}>Our Mission</h2>
                <div className={`rounded-3xl border p-8 mb-6 ${cardBase}`} style={{ background: isLight ? 'linear-gradient(135deg,#eff6ff,#f5f3ff)' : 'linear-gradient(135deg,rgba(59,130,246,0.08),rgba(139,92,246,0.08))' }}>
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className={`text-2xl font-black mb-3 ${headingCls}`}>
                    Deliver high-quality digital products and software solutions that empower every Indian business.
                  </h3>
                  <p className={`text-base leading-relaxed ${subCls}`}>
                    We are committed to making enterprise-grade software accessible, affordable, and genuinely useful — helping organisations across healthcare, education, finance, and business operations work smarter every day.
                  </p>
                </div>
              </motion.div>
            )}

            {section === 'values' && (
              <motion.div key="values" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.22}}>
                <h2 className={`text-xl font-black mb-6 ${headingCls}`}>Our Core Values</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {VALUES.map(({ icon, title, desc }, i) => (
                    <motion.div key={title} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                      className={`rounded-2xl border p-5 ${cardBase}`}>
                      <div className="text-3xl mb-3">{icon}</div>
                      <h4 className={`text-sm font-bold mb-1.5 ${headingCls}`}>{title}</h4>
                      <p className={`text-xs leading-relaxed ${subCls}`}>{desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {section === 'vision' && (
              <motion.div key="vision" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.22}}>
                <h2 className={`text-xl font-black mb-6 ${headingCls}`}>Our Vision</h2>
                <div className={`rounded-3xl border p-8 mb-6 ${cardBase}`} style={{ background: isLight ? 'linear-gradient(135deg,#f5f3ff,#ecfdf5)' : 'linear-gradient(135deg,rgba(139,92,246,0.08),rgba(16,185,129,0.08))' }}>
                  <div className="text-5xl mb-4">🔭</div>
                  <h3 className={`text-2xl font-black mb-3 ${headingCls}`}>
                    Enable businesses to grow through modern technology and become a globally trusted product company.
                  </h3>
                  <p className={`text-base leading-relaxed ${subCls}`}>
                    Beta Softnet aspires to be the most trusted enterprise software partner for Indian businesses — expanding into global markets while maintaining our commitment to quality, reliability, and customer success.
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { y:'2026', g:'Complete the enterprise product suite across all 4 verticals.', icon:'📦' },
                    { y:'2027', g:'Expand to Southeast Asia and Middle East markets.', icon:'🌏' },
                    { y:'2028', g:'1,00,000 active users across all Beta Softnet products.', icon:'🚀' },
                  ].map(({ y, g, icon }, i) => (
                    <motion.div key={y} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                      className={`rounded-2xl border p-5 ${cardBase}`}>
                      <div className="text-2xl mb-2">{icon}</div>
                      <p className="text-xs font-bold text-blue-500 mb-1">Goal {y}</p>
                      <p className={`text-sm leading-relaxed ${subCls}`}>{g}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {section === 'leadership' && (
              <motion.div key="leadership" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.22}}>
                <h2 className={`text-xl font-black mb-2 ${headingCls}`}>Leadership & Team</h2>
                <p className={`text-sm mb-5 ${subCls}`}>The people building Beta Softnet products with precision and purpose.</p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {TEAM.map(({ name, role, avatar, color, bio }, i) => (
                    <motion.div key={name} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                      className={`rounded-2xl border p-6 flex gap-4 ${cardBase}`}>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white flex-shrink-0 bg-gradient-to-br ${color}`}>
                        {avatar}
                      </div>
                      <div>
                        <p className={`text-base font-black mb-0.5 ${headingCls}`}>{name}</p>
                        <p className="text-xs font-semibold text-blue-500 mb-2">{role}</p>
                        <p className={`text-xs leading-relaxed ${subCls}`}>{bio}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.div className={`rounded-2xl border p-6 mt-5 ${cardBase}`} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.3}}>
                  <h3 className={`text-base font-bold mb-3 ${headingCls}`}>Contact Beta Softnet</h3>
                  <div className="flex flex-wrap gap-3">
                    <a href="mailto:santhoshp232004@gmail.com" className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all hover:-translate-y-0.5 ${isLight ? 'bg-white border-slate-200 text-slate-700 hover:border-blue-300' : 'bg-white/5 border-white/10 text-gray-300 hover:border-blue-400'}`}>
                      📧 santhoshp232004@gmail.com
                    </a>
                    <a href="tel:9976017966" className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all hover:-translate-y-0.5 ${isLight ? 'bg-white border-slate-200 text-slate-700 hover:border-blue-300' : 'bg-white/5 border-white/10 text-gray-300 hover:border-blue-400'}`}>
                      📞 +91 9976017966
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {section === 'global' && (
              <motion.div key="global" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.22}}>
                <h2 className={`text-xl font-black mb-6 ${headingCls}`}>Global Presence</h2>
                <div className={`rounded-3xl border p-8 mb-6 ${cardBase}`}>
                  <div className="text-5xl mb-4">🌍</div>
                  <h3 className={`text-2xl font-black mb-3 ${headingCls}`}>
                    Serving clients worldwide
                  </h3>
                  <p className={`text-base leading-relaxed ${subCls}`}>
                    We operate with a global mindset, expanding our footprint across Southeast Asia, the Middle East, and beyond, supporting enterprise clients in scaling their operations efficiently.
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
