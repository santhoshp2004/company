import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, THEMES } from '../context/ThemeContext';

const CLOUD_PARTNERS = [
  { name:'AWS', desc:'Cloud infrastructure hosting for Beta Softnet products with enterprise SLA.', category:'Cloud' },
  { name:'Microsoft Azure', desc:'Enterprise cloud and identity services integration for Beta HMS and ERP.', category:'Cloud' },
];

const TECH_PARTNERS = [
  { name:'Razorpay', desc:'Payment gateway integration for Beta Billing, Fee Manager and Payroll modules.', category:'Payments' },
  { name:'Twilio', desc:'SMS and communication services for OTP, alerts and notifications across products.', category:'Communications' },
  { name:'Zoho', desc:'CRM and productivity suite integration available for Beta CRM customers.', category:'Productivity' },
  { name:'Tally', desc:'Accounting data sync and migration support for Beta Accounts users.', category:'Finance' },
];

const BUSINESS_PARTNERS = [
  { name:'BrightPath Consulting', result:'Implemented Beta ERP and CRM across 12 manufacturing enterprises in Tamil Nadu.', region:'South India' },
  { name:'TechEdge Solutions', result:'Deployed Beta School ERP in 30+ institutions across Karnataka and Andhra Pradesh.', region:'South India' },
  { name:'NexGen Digital', result:'Digital transformation projects using Beta HMS and Clinic products for hospital chains.', region:'Pan India' },
  { name:'Catalyst Advisory', result:'Beta Payroll and HRMS implementation for mid-market companies across Maharashtra.', region:'West India' },
];

const BENEFITS = [
  { icon:'💰', title:'Revenue Share', desc:'Earn competitive recurring commissions on every implementation and subscription.' },
  { icon:'🎓', title:'Partner Training', desc:'Access to certified training, product demos, and co-branded sales collateral.' },
  { icon:'🔧', title:'Technical Support', desc:'Dedicated engineering contact for integration, migration, and go-live assistance.' },
  { icon:'📈', title:'Joint Marketing', desc:'Co-marketing opportunities including case studies, webinars and events.' },
];

const SIDE_ITEMS = [
  { key:'tech',      label:'Technology Partners', icon:'⚙️' },
  { key:'cloud',     label:'Cloud Partners',      icon:'☁️' },
  { key:'business',  label:'Business Partners',   icon:'🤝' },
  { key:'program',   label:'Partner Program',     icon:'🎁' },
  { key:'become',    label:'Become a Partner',    icon:'🚀' },
];

const fadeUp = { hidden:{opacity:0,y:14}, visible:(i)=>({opacity:1,y:0,transition:{delay:i*0.07,duration:0.32}}) };

export default function Partners() {
  const { theme } = useTheme();
  const isLight = theme === THEMES.VISION;
  const [section, setSection] = useState('tech');
  const [form, setForm] = useState({ name:'', email:'', company:'', type:'', message:'' });
  const [submitted, setSubmitted] = useState(false);

  const pageBg     = isLight ? 'bg-slate-50'   : 'bg-[#07071a]';
  const sidebarBg  = isLight ? 'bg-white border-r border-slate-200' : 'bg-[#0c0c22] border-r border-white/8';
  const headingCls = isLight ? 'text-slate-900' : 'text-white';
  const subCls     = isLight ? 'text-slate-500' : 'text-gray-400';
  const cardBase   = isLight ? 'bg-white border border-slate-200 hover:border-blue-200 hover:shadow-md' : 'bg-white/5 border border-white/8 hover:border-blue-500/30';
  const inputCls   = isLight
    ? 'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 transition-all'
    : 'w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400 transition-all';

  return (
    <div className={`min-h-screen ${pageBg} pt-[62px]`}>
      {/* Header */}
      <div className={`border-b px-6 py-5 ${isLight ? 'bg-white border-slate-200' : 'bg-[#0c0c22] border-white/8'}`}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-500 mb-1">Partner Ecosystem</p>
          <h1 className={`text-2xl font-black ${headingCls}`}>Beta Softnet Partners</h1>
          <p className={`text-sm mt-1 ${subCls}`}>Our strategic partnerships enable us to deliver innovative solutions...</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row" style={{ minHeight:'calc(100vh - 130px)' }}>
        {/* Sidebar */}
        <aside className={`w-full md:w-56 flex-shrink-0 md:sticky md:top-[62px] self-start z-10 ${sidebarBg}`} style={{ maxHeight:'calc(100vh - 130px)' }}>
          <div className="py-4 flex md:flex-col overflow-x-auto no-scrollbar border-b md:border-b-0 border-slate-200">
            <p className={`px-5 py-2 hidden md:block text-[10px] font-bold tracking-[0.3em] uppercase ${isLight ? 'text-slate-400' : 'text-gray-600'}`}>Navigation</p>
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
          <div className={`mx-4 mt-3 p-3 rounded-2xl hidden md:block ${isLight ? 'bg-emerald-50 border border-emerald-100' : 'bg-emerald-500/10 border border-emerald-500/20'}`}>
            <p className="text-xs font-bold text-emerald-600 mb-1">Contact Us</p>
            <a href="mailto:santhoshp232004@gmail.com" className="text-xs text-emerald-500 hover:text-emerald-600 block">santhoshp232004@gmail.com</a>
            <a href="tel:9976017966" className="text-xs text-emerald-500 hover:text-emerald-600 block mt-0.5">+91 9976017966</a>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">

            {section === 'tech' && (
              <motion.div key="tech" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.22}}>
                <h2 className={`text-xl font-black mb-2 ${headingCls}`}>Technology Partners</h2>
                <p className={`text-sm mb-5 ${subCls}`}>Integrations and ecosystem platforms powering Beta Softnet products.</p>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {TECH_PARTNERS.map(({ name, desc, category }, i) => (
                    <motion.div key={name} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                      className={`rounded-2xl border p-5 ${cardBase} transition-all duration-200 hover:-translate-y-0.5`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-black ${isLight ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-white'}`}>
                          {name.charAt(0)}
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${isLight ? 'bg-blue-50 text-blue-600' : 'bg-blue-500/15 text-blue-400'}`}>{category}</span>
                      </div>
                      <h3 className={`text-sm font-bold mb-1.5 ${headingCls}`}>{name}</h3>
                      <p className={`text-xs leading-relaxed ${subCls}`}>{desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {section === 'cloud' && (
              <motion.div key="cloud" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.22}}>
                <h2 className={`text-xl font-black mb-2 ${headingCls}`}>Cloud Partners</h2>
                <p className={`text-sm mb-5 ${subCls}`}>Our infrastructure providers ensuring 99.9% uptime.</p>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {CLOUD_PARTNERS.map(({ name, desc, category }, i) => (
                    <motion.div key={name} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                      className={`rounded-2xl border p-5 ${cardBase} transition-all duration-200 hover:-translate-y-0.5`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-black ${isLight ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-white'}`}>
                          {name.charAt(0)}
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${isLight ? 'bg-blue-50 text-blue-600' : 'bg-blue-500/15 text-blue-400'}`}>{category}</span>
                      </div>
                      <h3 className={`text-sm font-bold mb-1.5 ${headingCls}`}>{name}</h3>
                      <p className={`text-xs leading-relaxed ${subCls}`}>{desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {section === 'business' && (
              <motion.div key="business" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.22}}>
                <h2 className={`text-xl font-black mb-2 ${headingCls}`}>Business Partners</h2>
                <p className={`text-sm mb-5 ${subCls}`}>Consulting and implementation partners delivering Beta Softnet solutions across India.</p>
                <div className="space-y-4">
                  {BUSINESS_PARTNERS.map(({ name, result, region }, i) => (
                    <motion.div key={name} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                      className={`rounded-2xl border p-6 ${cardBase}`}>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${isLight ? 'bg-blue-50 text-blue-600' : 'bg-blue-500/15 text-blue-400'}`}>
                            🤝 Business Partner
                          </div>
                          <h3 className={`text-lg font-black mb-2 ${headingCls}`}>{name}</h3>
                          <p className={`text-sm leading-relaxed ${subCls}`}>{result}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex-shrink-0 ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-gray-400'}`}>{region}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {section === 'program' && (
              <motion.div key="program" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.22}}>
                <div className="mt-2">
                  <h3 className={`text-xl font-black mb-4 ${headingCls}`}>Partner Program Benefits</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {BENEFITS.map(({ icon, title, desc }, i) => (
                      <motion.div key={title} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                        className={`rounded-2xl border p-4 flex gap-4 ${cardBase}`}>
                        <div className="text-2xl flex-shrink-0">{icon}</div>
                        <div>
                          <p className={`text-sm font-bold mb-1 ${headingCls}`}>{title}</p>
                          <p className={`text-xs leading-relaxed ${subCls}`}>{desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {section === 'become' && (
              <motion.div key="become" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.22}}>
                <h2 className={`text-xl font-black mb-2 ${headingCls}`}>Become a Partner</h2>
                <p className={`text-sm mb-6 ${subCls}`}>Join the Beta Softnet partner network and grow your business with enterprise-grade software solutions.</p>
                {submitted ? (
                  <div className={`rounded-2xl border p-8 text-center ${isLight ? 'bg-emerald-50 border-emerald-200' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                    <div className="text-4xl mb-3">✅</div>
                    <h3 className={`text-lg font-black mb-2 ${headingCls}`}>Application Received!</h3>
                    <p className={`text-sm ${subCls}`}>We'll follow up at santhoshp232004@gmail.com within one business day.</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name:'',email:'',company:'',type:'',message:'' }); }}
                      className="mt-4 text-sm font-semibold text-blue-500 hover:text-blue-600">Submit Another →</button>
                  </div>
                ) : (
                  <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
                    className={`rounded-2xl border p-6 space-y-4 max-w-2xl ${isLight ? 'bg-white border-slate-200' : 'bg-white/5 border-white/8'}`}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Full Name *</label>
                        <input required type="text" value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Your name" className={inputCls}/></div>
                      <div><label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Business Email *</label>
                        <input required type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="you@company.com" className={inputCls}/></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Company Name *</label>
                        <input required type="text" value={form.company} onChange={e => setForm({...form,company:e.target.value})} placeholder="Company" className={inputCls}/></div>
                      <div><label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Partnership Type</label>
                        <select value={form.type} onChange={e => setForm({...form,type:e.target.value})} className={inputCls}>
                          <option value="">Select type</option>
                          <option>Technology Integration</option>
                          <option>Reseller / Implementation</option>
                          <option>Strategic Alliance</option>
                        </select></div>
                    </div>
                    <div><label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Message</label>
                      <textarea rows={4} value={form.message} onChange={e => setForm({...form,message:e.target.value})} placeholder="Tell us about your partnership goals..." className={`${inputCls} resize-none`}/></div>
                    <button type="submit" className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                      style={{ background:'linear-gradient(135deg,#3B82F6,#8B5CF6)', boxShadow:'0 4px 14px rgba(59,130,246,0.3)' }}>
                      Submit Application
                    </button>
                  </form>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
