import { motion } from 'framer-motion';
import { useTheme, THEMES } from '../context/ThemeContext';

const team = [
  {
    name: 'Santhosh',
    role: 'Founder & CEO',
    avatar: 'S',
    color: 'from-blue-500 to-violet-600',
    bio: 'Founder of USEMETA with a vision to create reliable software products and business solutions for organisations worldwide. Contact: santhoshp232004@gmail.com · +91 9976017966',
  },
  {
    name: 'Product Team',
    role: 'Product & Design',
    avatar: 'P',
    color: 'from-purple-500 to-indigo-600',
    bio: 'Our product team is dedicated to crafting intuitive, reliable digital experiences. We focus on real business problems and deliver clean, well-documented software.',
  },
  {
    name: 'Engineering Team',
    role: 'Software Engineering',
    avatar: 'E',
    color: 'from-cyan-500 to-blue-600',
    bio: 'Our engineers build scalable, secure, and performant systems. We follow best practices in software development, from architecture to deployment.',
  },
  {
    name: 'Customer Success',
    role: 'Client Services',
    avatar: 'C',
    color: 'from-green-500 to-teal-600',
    bio: 'We are committed to ensuring every client gets maximum value from USEMETA products. Reach us at santhoshp232004@gmail.com.',
  },
];

const milestones = [
  { year: '2021', title: 'USEMETA Founded', desc: 'Founded by Santhosh with a clear mission: create reliable software products and business solutions for organisations worldwide.' },
  { year: '2022', title: 'First 1,000 Clients', desc: 'Launched FlowBuilder and InsightBoard. Reached 1,000 active clients and achieved strong early revenue growth.' },
  { year: '2023', title: 'Product Suite Expansion', desc: 'Expanded to six products — CloudVault, SecureAuth, MessageHub, and DevPipeline joined the platform.' },
  { year: '2024', title: 'Global Reach', desc: 'Serving clients across 40+ countries. Crossed significant revenue milestones with 5,000+ active organisations.' },
  { year: '2025', title: '10,000+ Organisations', desc: 'Reached 10,000+ organisations in 80 countries. Launched enterprise edition with dedicated account management.' },
  { year: '2026', title: 'Continued Growth', desc: 'Investing in product quality, platform reliability, and expanding our team to serve clients at greater scale.' },
];

const achievements = [
  { value: '10K+',   label: 'Organisations' },
  { value: '80+',    label: 'Countries' },
  { value: '6',      label: 'Core Products' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '500+',   label: 'Integrations' },
  { value: '4.8/5',  label: 'Client Rating' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function About() {
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

        {/* ── Hero ── */}
        <motion.div className="text-center mb-20" initial="hidden" animate="visible" variants={fadeUp}>
          <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${isLight?'text-blue-600':'text-primary-400'}`}>Our Story</p>
          <h1 className={`text-5xl sm:text-6xl font-black leading-tight mb-5 ${headingCls}`}>
            Building Software Products<br/>
            <span className={t.gradientText}>Organisations Can Rely On</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${subTxtCls}`}>
            USEMETA was founded by Santhosh with a vision to create reliable software products and business solutions for organisations worldwide — making enterprise-grade technology accessible to every team.
          </p>
        </motion.div>

        {/* ── Mission & Vision ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {[
            { icon:'🎯', title:'Our Mission', text:'Deliver high-quality digital products and software solutions that enable organisations to operate more efficiently, serve clients better, and grow with confidence.' },
            { icon:'🔭', title:'Our Vision',  text:'Enable businesses to grow through modern technology and innovation — providing every organisation, regardless of size, access to reliable enterprise-grade software products.' },
          ].map(({ icon, title, text }, i) => (
            <motion.div key={title} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}
              style={{transitionDelay:`${i*0.1}s`}}
              className={`${cardCls} rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1`}>
              <div className="text-4xl mb-4">{icon}</div>
              <h2 className={`text-2xl font-black mb-3 ${headingCls}`}>{title}</h2>
              <p className={`leading-relaxed ${subTxtCls}`}>{text}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Achievements ── */}
        <motion.div className={`${cardCls} rounded-3xl p-8 mb-20`} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
          <h2 className={`text-2xl font-black text-center mb-8 ${headingCls}`}>USEMETA By The Numbers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className={`text-3xl font-black mb-1 ${t.gradientText}`}>{value}</p>
                <p className={`text-xs font-medium ${mutedCls}`}>{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="mb-20">
          <motion.h2 className={`text-3xl font-black text-center mb-12 ${headingCls}`} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
            Our Journey
          </motion.h2>
          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px opacity-40"
              style={{background:'linear-gradient(180deg,#3B82F6,#8B5CF6,#06B6D4)'}}/>

            <div className="space-y-8">
              {milestones.map(({ year, title, desc }, i) => (
                <motion.div key={year} className={`relative flex items-start gap-6 ${i%2===0?'lg:flex-row':'lg:flex-row-reverse'}`}
                  initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
                  <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                    style={{background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',boxShadow:'0 0 12px rgba(59,130,246,0.5)'}}/>
                  <div className={`ml-10 lg:ml-0 ${cardCls} rounded-2xl p-5 lg:w-[45%] transition-all duration-300 hover:-translate-y-0.5`}>
                    <span className={`text-xs font-bold tracking-widest ${isLight?'text-blue-600':'text-primary-400'}`}>{year}</span>
                    <h3 className={`text-base font-bold mt-1 mb-1.5 ${headingCls}`}>{title}</h3>
                    <p className={`text-sm leading-relaxed ${subTxtCls}`}>{desc}</p>
                  </div>
                  <div className="hidden lg:block lg:w-[45%]"/>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Team ── */}
        <div>
          <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
            <h2 className={`text-3xl font-black mb-2 ${headingCls}`}>Our Team</h2>
            <p className={subTxtCls}>Dedicated professionals building reliable software products for organisations worldwide.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map(({ name, role, avatar, color, bio }, i) => (
              <motion.div key={name} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}
                style={{transitionDelay:`${i*0.08}s`}}
                className={`${cardCls} rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 group`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl font-black text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>{avatar}</div>
                <h3 className={`text-base font-bold mb-0.5 ${headingCls}`}>{name}</h3>
                <p className={`text-xs font-medium mb-3 ${isLight?'text-blue-600':'text-primary-400'}`}>{role}</p>
                <p className={`text-xs leading-relaxed ${mutedCls}`}>{bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Contact card ── */}
        <motion.div className={`mt-16 ${cardCls} rounded-3xl p-10 text-center`} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
          <h2 className={`text-2xl font-black mb-3 ${headingCls}`}>Get In Touch</h2>
          <p className={`mb-6 ${subTxtCls}`}>Have questions about USEMETA? We'd love to hear from you.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a href="mailto:santhoshp232004@gmail.com"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all ${isLight?'bg-white border-slate-200 text-slate-700 hover:border-blue-300':'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}>
              📧 santhoshp232004@gmail.com
            </a>
            <a href="tel:9976017966"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all ${isLight?'bg-white border-slate-200 text-slate-700 hover:border-blue-300':'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}>
              📞 +91 9976017966
            </a>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
