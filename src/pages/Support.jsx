import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, THEMES } from '../context/ThemeContext';

const faqs = [
  { q: 'How does the 14-day free trial work?',
    a: 'Sign up and get instant access to all features for 14 days. No credit card required. After the trial, choose a plan or your account will be paused.' },
  { q: 'Can I switch plans at any time?',
    a: 'Yes — upgrade or downgrade at any time. Upgrades apply immediately and are prorated. Downgrades take effect at the next billing cycle.' },
  { q: 'Is my data secure?',
    a: 'Absolutely. We are SOC2 Type II certified and use end-to-end encryption. Data is stored in isolated environments per organisation with zero-knowledge architecture options available.' },
  { q: 'Do you offer volume discounts?',
    a: 'Yes — for teams of 50 or more we offer custom pricing with volume discounts. Contact us at santhoshp232004@gmail.com to discuss your requirements.' },
  { q: 'What integrations do you support?',
    a: 'We offer 500+ native integrations. Our REST API and webhooks allow you to connect any custom system or third-party tool your team uses.' },
  { q: 'What happens to my data if I cancel?',
    a: 'You have 30 days after cancellation to export your data. We provide full data export in JSON/CSV formats at no cost. After 30 days, data is securely deleted.' },
  { q: 'Do you offer onboarding support?',
    a: 'All paid plans include guided onboarding. Business and Enterprise plans include a dedicated account manager and personalised onboarding sessions.' },
  { q: 'What is your uptime commitment?',
    a: 'We guarantee 99.99% uptime across all infrastructure, backed by financial credits if we fall short. Contact us for current system status.' },
];

const helpCategories = [
  { icon: '🚀', label: 'Getting Started',       articles: 24 },
  { icon: '🔧', label: 'Configuration',          articles: 18 },
  { icon: '🔌', label: 'Integrations',           articles: 31 },
  { icon: '🔒', label: 'Security & Privacy',     articles: 15 },
  { icon: '💳', label: 'Billing',                articles: 12 },
  { icon: '📊', label: 'Analytics & Reports',    articles: 20 },
  { icon: '🛠️', label: 'Troubleshooting',       articles: 28 },
  { icon: '📱', label: 'API Reference',          articles: 45 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function Support() {
  const { theme, t } = useTheme();
  const isLight = theme === THEMES.VISION;

  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const headingCls = isLight ? 'text-slate-900' : 'text-white';
  const subTxtCls  = isLight ? 'text-slate-600' : 'text-gray-400';
  const mutedCls   = isLight ? 'text-slate-400' : 'text-gray-600';
  const cardCls    = isLight ? 'bg-white/70 backdrop-blur-xl border border-slate-200/80' : 'bg-white/5 backdrop-blur-md border border-white/10';
  const divider    = isLight ? 'border-slate-100' : 'border-white/8';
  const inputCls   = isLight ? 'input-field-light' : 'input-field';
  const faqActiveCls = isLight ? 'border-blue-300/60 bg-blue-50/30' : 'border-primary-500/40';

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen pt-24 pb-20" style={t.pageBgStyle}>
      <div className="section-container">

        {/* Hero */}
        <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={fadeUp}>
          <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${isLight?'text-blue-600':'text-primary-400'}`}>Support Centre</p>
          <h1 className={`text-4xl sm:text-5xl font-black leading-tight mb-4 ${headingCls}`}>
            How can we <span className={t.gradientText}>help you?</span>
          </h1>
          <p className={`max-w-lg mx-auto mb-2 ${subTxtCls}`}>
            Search our help articles or contact our support team directly. We're here to help.
          </p>
          <p className={`text-sm ${mutedCls}`}>
            Email: <a href="mailto:santhoshp232004@gmail.com" className={`font-medium ${isLight?'text-blue-600':'text-blue-400'} hover:underline`}>santhoshp232004@gmail.com</a>
            {' '}· Phone: <a href="tel:9976017966" className={`font-medium ${isLight?'text-blue-600':'text-blue-400'} hover:underline`}>+91 9976017966</a>
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{color:isLight?'#94a3b8':'#6b7280'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input type="text" placeholder="Search help articles, guides, and documentation..."
              className={`w-full pl-12 pr-4 py-4 rounded-2xl text-base outline-none transition-all ${inputCls}`}
            />
          </div>
        </div>

        {/* Help categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
          {helpCategories.map(({ icon, label, articles }, i) => (
            <motion.button key={label} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}
              style={{transitionDelay:`${i*0.04}s`}}
              className={`${cardCls} rounded-2xl p-4 text-center group transition-all duration-300 hover:-translate-y-1`}>
              <div className="text-3xl mb-2">{icon}</div>
              <p className={`text-sm font-semibold ${headingCls}`}>{label}</p>
              <p className={`text-xs mt-0.5 ${mutedCls}`}>{articles} articles</p>
            </motion.button>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-20">
          <motion.div className="text-center mb-8" initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
            <h2 className={`text-3xl font-black mb-2 ${headingCls}`}>Frequently Asked Questions</h2>
            <p className={subTxtCls}>Quick answers to common questions.</p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}
                style={{transitionDelay:`${i*0.04}s`}}
                className={`${cardCls} rounded-2xl border transition-all duration-300 ${openFaq===i ? faqActiveCls : ''}`}>
                <button onClick={() => setOpenFaq(openFaq===i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className={`text-sm font-semibold ${headingCls}`}>{q}</span>
                  <svg className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openFaq===i ? 'rotate-180' : ''}`}
                    style={{color:openFaq===i?(isLight?'#3B82F6':'#818cf8'):(isLight?'#94a3b8':'#6b7280')}}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <AnimatePresence>
                  {openFaq===i && (
                    <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.25}}>
                      <div className={`px-6 pb-5 text-sm leading-relaxed ${subTxtCls}`}>{a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-5">
            <h2 className={`text-3xl font-black ${headingCls}`}>Contact Support</h2>
            <p className={subTxtCls}>Our support team is here to help. Reach us through any of the channels below.</p>

            {[
              { icon:'💬', title:'Live Chat', desc:'Chat with our team in real time. Average response under 5 minutes during business hours.', action:'Start Chat', color:'from-blue-500 to-cyan-500' },
              { icon:'📧', title:'Email Support', desc:'santhoshp232004@gmail.com — We reply within 4 business hours.', action:'Send Email', href:'mailto:santhoshp232004@gmail.com', color:'from-violet-500 to-purple-500' },
              { icon:'📞', title:'Phone Support', desc:'+91 9976017966 — Available Monday to Friday, 9am–6pm IST.', action:'Call Now', href:'tel:9976017966', color:'from-green-500 to-teal-500' },
            ].map(({ icon, title, desc, action, href, color }) => (
              <div key={title} className={`${cardCls} rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 hover:-translate-y-0.5 group`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl flex-shrink-0`}>{icon}</div>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${headingCls}`}>{title}</p>
                  <p className={`text-xs mt-0.5 leading-relaxed ${mutedCls}`}>{desc}</p>
                </div>
                {href ? (
                  <a href={href} className={`text-xs font-semibold flex-shrink-0 ${isLight?'text-blue-600 hover:text-blue-700':'text-blue-400 hover:text-blue-300'} transition-colors`}>{action} →</a>
                ) : (
                  <button className={`text-xs font-semibold flex-shrink-0 ${isLight?'text-blue-600 hover:text-blue-700':'text-blue-400 hover:text-blue-300'} transition-colors`}>{action} →</button>
                )}
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className={`${cardCls} rounded-2xl p-7`}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                  style={{background:'linear-gradient(135deg,#10b981,#059669)'}}>✓</div>
                <h3 className={`text-xl font-bold ${headingCls}`}>Message Sent!</h3>
                <p className={`text-sm ${subTxtCls}`}>We'll get back to you at santhoshp232004@gmail.com within 4 business hours.</p>
                <button onClick={() => { setSubmitted(false); setFormData({ name:'',email:'',subject:'',message:'' }); }}
                  className={`px-5 py-2.5 rounded-xl font-semibold border text-sm transition-all ${isLight?'bg-white border-slate-200 text-slate-700 hover:border-blue-300':'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className={`text-xl font-bold mb-5 ${headingCls}`}>Send us a message</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[{name:'name',label:'Name',placeholder:'Your name',type:'text'},{name:'email',label:'Email',placeholder:'your@email.com',type:'email'}].map(({name,label,placeholder,type})=>(
                    <div key={name}>
                      <label className={`block text-xs font-medium mb-1.5 ${mutedCls}`}>{label}</label>
                      <input required type={type} value={formData[name]} onChange={e=>setFormData({...formData,[name]:e.target.value})}
                        placeholder={placeholder} className={`${inputCls} text-sm py-2.5`}/>
                    </div>
                  ))}
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${mutedCls}`}>Subject</label>
                  <input required type="text" value={formData.subject} onChange={e=>setFormData({...formData,subject:e.target.value})}
                    placeholder="How can we help?" className={`${inputCls} text-sm py-2.5`}/>
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${mutedCls}`}>Message</label>
                  <textarea required rows={5} value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})}
                    placeholder="Describe your question in detail..."
                    className={`${inputCls} text-sm py-2.5 resize-none`}/>
                </div>
                <button type="submit" className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5"
                  style={{background:'linear-gradient(135deg,#3B82F6,#8B5CF6)'}}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
