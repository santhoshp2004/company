import { motion } from 'framer-motion';
import { useTheme, THEMES } from '../context/ThemeContext';

const benefits = [
  { icon: '💰', title: 'Revenue Share',           desc: 'Earn competitive recurring revenue for every client you refer. Paid monthly with transparent reporting.' },
  { icon: '🎓', title: 'Partner Training',         desc: 'Full access to USEMETA product training, documentation, and dedicated partner support.' },
  { icon: '🚀', title: 'Co-Marketing',             desc: 'Joint case studies, webinars, and campaigns. Get featured in our partner directory.' },
  { icon: '🔧', title: 'Technical Resources',      desc: 'Priority access to our engineering team, sandbox environments, and technical guidance.' },
  { icon: '📊', title: 'Partner Dashboard',        desc: 'Real-time visibility into leads, conversions, and commissions through a dedicated portal.' },
  { icon: '🌍', title: 'Business Network',         desc: 'Connect with partners worldwide. Collaborate, co-sell, and grow together in new markets.' },
];

const partnerTypes = [
  { name: 'Technology Partner',   category: 'Software Integration', tier: 'Technology' },
  { name: 'Reseller Partner',     category: 'Sales & Distribution', tier: 'Reseller'   },
  { name: 'Consulting Partner',   category: 'Professional Services', tier: 'Consulting' },
  { name: 'Agency Partner',       category: 'Digital Agency',       tier: 'Agency'     },
  { name: 'Enterprise Partner',   category: 'Enterprise Sales',     tier: 'Enterprise' },
  { name: 'Regional Partner',     category: 'Regional Distribution', tier: 'Regional'  },
];

const tiers = [
  {
    name: 'Standard',
    color: 'from-gray-400 to-gray-500',
    commission: '15%',
    perks: ['Partner directory listing', 'Co-marketing materials', 'Monthly reporting', 'Email support'],
  },
  {
    name: 'Business',
    color: 'from-blue-400 to-violet-500',
    commission: '22%',
    perks: ['Everything in Standard', 'Dedicated partner manager', 'Priority support', 'Quarterly business reviews', 'Early product access'],
    popular: true,
  },
  {
    name: 'Enterprise',
    color: 'from-violet-400 to-cyan-400',
    commission: '30%',
    perks: ['Everything in Business', 'Engineering integration support', 'Joint go-to-market strategy', 'Co-branded campaigns', 'Executive relationship'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Partners() {
  const { theme, t } = useTheme();
  const isLight = theme === THEMES.VISION;

  const headingCls = isLight ? 'text-slate-900' : 'text-white';
  const subTxtCls  = isLight ? 'text-slate-600' : 'text-gray-400';
  const mutedCls   = isLight ? 'text-slate-400' : 'text-gray-600';
  const cardCls    = isLight ? 'bg-white/70 backdrop-blur-xl border border-slate-200/80' : 'bg-white/5 backdrop-blur-md border border-white/10';
  const divider    = isLight ? 'border-slate-100' : 'border-white/8';

  return (
    <main className="min-h-screen pt-24 pb-20" style={t.pageBgStyle}>
      <div className="section-container">

        {/* Hero */}
        <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={fadeUp}>
          <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${isLight?'text-blue-600':'text-primary-400'}`}>Partner Programme</p>
          <h1 className={`text-5xl sm:text-6xl font-black leading-tight mb-4 ${headingCls}`}>
            Grow Together,<br/>
            <span className={t.gradientText}>Win Together</span>
          </h1>
          <p className={`text-lg max-w-xl mx-auto mb-4 ${subTxtCls}`}>
            Partner with USEMETA to deliver reliable software solutions to your clients and earn competitive recurring commissions.
          </p>
          <p className={`text-sm ${mutedCls}`}>
            Partnerships: <a href="mailto:santhoshp232004@gmail.com" className={`font-medium ${isLight?'text-blue-600':'text-blue-400'} hover:underline`}>santhoshp232004@gmail.com</a>
            {' '}·{' '}
            <a href="tel:9976017966" className={`font-medium ${isLight?'text-blue-600':'text-blue-400'} hover:underline`}>+91 9976017966</a>
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {benefits.map(({ icon, title, desc }, i) => (
            <motion.div key={title} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}
              style={{transitionDelay:`${i*0.07}s`}}
              className={`${cardCls} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group`}>
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className={`text-base font-bold mb-1.5 ${headingCls}`}>{title}</h3>
              <p className={`text-sm leading-relaxed ${subTxtCls}`}>{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Tiers */}
        <div className="mb-20">
          <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
            <h2 className={`text-3xl font-black mb-2 ${headingCls}`}>Partnership Tiers</h2>
            <p className={subTxtCls}>Choose the programme that fits your business model.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map(({ name, color, commission, perks, popular }, i) => (
              <motion.div key={name} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}
                style={{transitionDelay:`${i*0.1}s`}}
                className={`relative ${cardCls} rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 ${popular?`border-blue-400/40 shadow-xl`:'border-white/10'}`}>
                {popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold text-white rounded-full shadow-lg"
                    style={{background:'linear-gradient(135deg,#3B82F6,#8B5CF6)'}}>Most Popular</div>
                )}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-4 bg-gradient-to-r ${color}`}>
                  <span className="text-sm font-bold text-white">{name} Partner</span>
                </div>
                <div className="mb-5">
                  <span className={`text-4xl font-black ${headingCls}`}>{commission}</span>
                  <span className={`text-sm ml-1 ${subTxtCls}`}>recurring commission</span>
                </div>
                <ul className="space-y-3 mb-7">
                  {perks.map((perk) => (
                    <li key={perk} className={`flex items-start gap-2.5 text-sm ${subTxtCls}`}>
                      <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isLight?'text-blue-500':'text-emerald-400'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {perk}
                    </li>
                  ))}
                </ul>
                <a href="mailto:santhoshp232004@gmail.com?subject=Partner Application"
                  className={`w-full block text-center py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 ${popular?'text-white':'border'}`}
                  style={popular?{background:'linear-gradient(135deg,#3B82F6,#8B5CF6)'}:{}}
                  {...(!popular && {style:{}})}
                >
                  Apply for {name}
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partner types */}
        <div className="mb-16">
          <motion.div className="text-center mb-8" initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
            <h2 className={`text-3xl font-black mb-2 ${headingCls}`}>Partnership Types</h2>
            <p className={subTxtCls}>We welcome different types of business partnerships.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {partnerTypes.map(({ name, category, tier }, i) => (
              <motion.div key={name} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}
                style={{transitionDelay:`${i*0.06}s`}}
                className={`${cardCls} rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-0.5 group`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 ${isLight?'bg-blue-50 border border-blue-100':'bg-white/5 border border-white/10'}`}>
                  <span className={`text-lg font-black ${isLight?'text-blue-600':'text-white/60'} group-hover:text-blue-400 transition-colors`}>{name.charAt(0)}</span>
                </div>
                <p className={`text-sm font-bold mb-0.5 ${headingCls}`}>{name}</p>
                <p className={`text-xs ${mutedCls}`}>{category}</p>
                <span className={`inline-block mt-2 px-2 py-0.5 text-[10px] font-bold rounded-full ${isLight?'bg-blue-50 text-blue-600':'bg-primary-500/10 text-primary-400'}`}>{tier}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div className={`${cardCls} rounded-3xl p-10 text-center`} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
          <h2 className={`text-3xl font-black mb-3 ${headingCls}`}>Ready to become a partner?</h2>
          <p className={`mb-4 ${subTxtCls} max-w-md mx-auto`}>
            Contact us to discuss your partnership goals. We'll get back to you within 24 hours.
          </p>
          <p className={`text-sm mb-6 ${mutedCls}`}>santhoshp232004@gmail.com · +91 9976017966</p>
          <a href="mailto:santhoshp232004@gmail.com?subject=Become a Partner"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all hover:-translate-y-1"
            style={{background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',boxShadow:'0 8px 30px rgba(59,130,246,0.35)'}}>
            Become a Partner
          </a>
        </motion.div>

      </div>
    </main>
  );
}
