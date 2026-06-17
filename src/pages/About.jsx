import { motion } from 'framer-motion';
import { useTheme, THEMES } from '../context/ThemeContext';

const values = [
  { icon: '🚀', title: 'Ship Quality Software', desc: 'We move fast with discipline, delivering secure products that customers trust.' },
  { icon: '🌍', title: 'Global Mindset', desc: 'Build products that serve diverse teams across markets and industries.' },
  { icon: '🤝', title: 'Transparent Collaboration', desc: 'We share plans, feedback, and progress openly across teams and partners.' },
  { icon: '🌱', title: 'Continual Growth', desc: 'We invest in learning, experimentation, and the next version of our people and products.' },
];

const milestones = [
  { year: '2021', title: 'USEMETA Founded', desc: 'Santhosh launched USEMETA to build enterprise-grade software products for growing teams.' },
  { year: '2022', title: 'First Product Launch', desc: 'Released the initial product suite and established the first customer cohort.' },
  { year: '2023', title: 'Expanded Product Suite', desc: 'Brought new products to market and strengthened reuse across teams.' },
  { year: '2024', title: 'Global Customer Reach', desc: 'Grew into new regions and supported customers across multiple industries.' },
  { year: '2025', title: 'Enterprise Adoption', desc: 'Launched enterprise-grade offerings with dedicated account and implementation support.' },
];

const achievements = [
  { value: '10K+', label: 'Organisations' },
  { value: '80+', label: 'Countries' },
  { value: '6', label: 'Core Products' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '500+', label: 'Built integrations' },
  { value: '4.8/5', label: 'Customer rating' },
];

const team = [
  { name: 'Santhosh', role: 'Founder & CEO', avatar: 'S', color: 'from-blue-500 to-violet-600' },
  { name: 'Product Team', role: 'Product & Design', avatar: 'P', color: 'from-purple-500 to-indigo-600' },
  { name: 'Engineering Team', role: 'Software Engineering', avatar: 'E', color: 'from-cyan-500 to-blue-600' },
  { name: 'Customer Success', role: 'Client Services', avatar: 'C', color: 'from-green-500 to-teal-600' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function About() {
  const { theme, t } = useTheme();
  const isLight = theme === THEMES.VISION;
  const headingCls = isLight ? 'text-slate-900' : 'text-white';
  const subTxtCls = isLight ? 'text-slate-600' : 'text-gray-400';
  const cardCls = isLight ? 'bg-white/80 backdrop-blur-xl border border-slate-200/80' : 'bg-white/5 backdrop-blur-md border border-white/10';

  return (
    <main className="min-h-screen pt-24 pb-20" style={t.pageBgStyle}>
      <div className="section-container">

        <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={fadeUp}>
          <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${isLight ? 'text-blue-600' : 'text-primary-400'}`}>Our story</p>
          <h1 className={`text-5xl sm:text-6xl font-black leading-tight mb-4 ${headingCls}`}>
            Building software products<br />
            <span className={t.gradientText}>organisations can rely on.</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${subTxtCls}`}>
            USEMETA was founded by Santhosh to create software products that help businesses grow, scale, and compete with confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`${cardCls} rounded-3xl p-8`}>
            <p className="text-sm uppercase tracking-[0.24em] text-primary-400 mb-3">Founder message</p>
            <h2 className={`text-3xl font-black mb-4 ${headingCls}`}>From Santhosh</h2>
            <p className={`text-sm leading-relaxed ${subTxtCls} mb-4`}>
              At USEMETA, we build products with clarity, trust, and long-term value in mind. Our goal is to help businesses grow through intelligent technology and dependable execution.
            </p>
            <p className={`text-sm leading-relaxed ${subTxtCls}`}>
              Every product we deliver is designed to solve real business problems while preserving simplicity and enterprise-grade reliability.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`${cardCls} rounded-3xl p-8`}>
            <p className="text-sm uppercase tracking-[0.24em] text-primary-400 mb-3">Mission & Vision</p>
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${headingCls}`}>Mission</h3>
                <p className={`text-sm leading-relaxed ${subTxtCls}`}>Build innovative software products that help businesses grow and succeed.</p>
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 ${headingCls}`}>Vision</h3>
                <p className={`text-sm leading-relaxed ${subTxtCls}`}>Become a globally trusted product-based technology company.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((value, index) => (
            <motion.div key={value.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ transitionDelay: `${index * 0.06}s` }}
              className={`${cardCls} rounded-3xl p-7`}>
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className={`text-xl font-bold mb-3 ${headingCls}`}>{value.title}</h3>
              <p className={`text-sm leading-relaxed ${subTxtCls}`}>{value.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className={`${cardCls} rounded-3xl p-8 mb-20`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className={`text-3xl font-black text-center mb-8 ${headingCls}`}>USEMETA by the numbers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <div key={item.label} className="text-center">
                <p className={`text-4xl font-black mb-2 ${t.gradientText}`}>{item.value}</p>
                <p className={`text-sm ${subTxtCls}`}>{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mb-20 relative">
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px opacity-40"
            style={{ background: 'linear-gradient(180deg,#3B82F6,#8B5CF6,#06B6D4)' }} />
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div key={milestone.year} className={`relative flex flex-col lg:flex-row lg:items-start gap-6 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                style={{ transitionDelay: `${index * 0.06}s` }}>
                <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full mt-1.5"
                  style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', boxShadow: '0 0 12px rgba(59,130,246,0.5)' }} />
                <div className={`${cardCls} rounded-3xl p-6 lg:w-[45%]`}>
                  <span className="text-xs uppercase tracking-[0.28em] text-primary-400">{milestone.year}</span>
                  <h3 className={`text-xl font-bold mt-3 mb-2 ${headingCls}`}>{milestone.title}</h3>
                  <p className={`text-sm leading-relaxed ${subTxtCls}`}>{milestone.desc}</p>
                </div>
                <div className="hidden lg:block lg:w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className={`text-3xl font-black mb-2 ${headingCls}`}>Leadership & Team</h2>
            <p className={subTxtCls}>Our team brings product leadership, engineering precision, and customer focus together.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, index) => (
              <motion.div key={member.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                style={{ transitionDelay: `${index * 0.06}s` }}
                className={`${cardCls} rounded-3xl p-7 text-center`}>
                <div className={`w-16 h-16 rounded-3xl mx-auto mb-4 bg-gradient-to-br ${member.color} flex items-center justify-center text-2xl font-black text-white`}>{member.avatar}</div>
                <p className={`text-lg font-bold mb-1 ${headingCls}`}>{member.name}</p>
                <p className={`text-sm ${subTxtCls}`}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className={`${cardCls} rounded-3xl p-10 text-center`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className={`text-3xl font-black mb-4 ${headingCls}`}>Contact USEMETA</h2>
          <p className={`text-sm leading-relaxed mb-6 ${subTxtCls}`}>
            Ready to learn more? Reach out to our founder and product team for partnership, product, and enterprise enquiries.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:santhoshp232004@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 border border-white/10 text-white transition-all hover:bg-white/15">📧 santhoshp232004@gmail.com</a>
            <a href="tel:9976017966" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 border border-white/10 text-white transition-all hover:bg-white/15">📞 +91 9976017966</a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
