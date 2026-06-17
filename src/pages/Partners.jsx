import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme, THEMES } from '../context/ThemeContext';

const benefits = [
  { icon: '💰', title: 'Revenue Share', desc: 'Earn competitive recurring revenue on every partner referral and subscription.' },
  { icon: '🎓', title: 'Partner Enablement', desc: 'Access co-branded materials, training programs, and launch support.' },
  { icon: '🔧', title: 'Technical Support', desc: 'Work directly with our engineering team for integration and deployment success.' },
  { icon: '📈', title: 'Growth Guidance', desc: 'Receive strategic insights to scale deals, close faster, and build recurring streams.' },
  { icon: '🌍', title: 'Global Reach', desc: 'Collaborate with a partner network spanning regions, industries, and enterprise accounts.' },
  { icon: '🤝', title: 'Aligned Success', desc: 'Execute shared go-to-market plans that reward both partners and USEMETA equally.' },
];

const partnerTypes = [
  { name: 'Integration Partner', category: 'Technology', description: 'Extend USEMETA products with seamless platform integrations.' },
  { name: 'Reseller Partner', category: 'Sales', description: 'Resell USEMETA solutions to clients who need enterprise-grade SaaS.' },
  { name: 'Consulting Partner', category: 'Services', description: 'Deliver strategic implementations and digital transformation programs.' },
  { name: 'Agency Partner', category: 'Marketing', description: 'Support customers with digital growth strategy and product adoption.' },
  { name: 'Enterprise Partner', category: 'Strategic', description: 'Co-create and launch tailored solutions for large organisations.' },
  { name: 'Regional Partner', category: 'Local', description: 'Bring USEMETA to new markets with local expertise and network reach.' },
];

const tiers = [
  {
    name: 'Standard', commission: '15%', color: 'from-slate-500 to-slate-600',
    perks: ['Partner directory listing', 'Marketing toolkit', 'Quarterly updates', 'Email support'],
  },
  {
    name: 'Business', commission: '22%', color: 'from-blue-500 to-violet-500', popular: true,
    perks: ['Everything in Standard', 'Dedicated partner manager', 'Priority technical reviews', 'Early roadmap access'],
  },
  {
    name: 'Enterprise', commission: '30%', color: 'from-violet-500 to-cyan-500',
    perks: ['Everything in Business', 'Co-selling enablement', 'Executive alignment sessions', 'Joint innovation workshops'],
  },
];

const stories = [
  { name: 'BrightPath Consulting', result: '5x revenue growth with USEMETA automation solutions across finance teams.' },
  { name: 'NexGen Software', result: 'Expanded product delivery through secure integrations and joint deployment support.' },
];

const processSteps = [
  { title: 'Discovery', detail: 'Share your business goals and partnership ambitions with the USEMETA team.' },
  { title: 'Alignment', detail: 'Define the partner tier, market focus, and operational readiness.' },
  { title: 'Launch', detail: 'Activate enablement, sales support, and shared customer success workflows.' },
  { title: 'Scale', detail: 'Grow deals together with performance reviews, best practices, and ongoing collaboration.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Partners() {
  const { theme, t } = useTheme();
  const isLight = theme === THEMES.VISION;
  const [formState, setFormState] = useState({ name: '', email: '', company: '', partnerType: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const cardCls = isLight ? 'bg-white/80 backdrop-blur-xl border border-slate-200/80' : 'bg-white/5 backdrop-blur-md border border-white/10';
  const headingCls = isLight ? 'text-slate-900' : 'text-white';
  const subTxtCls = isLight ? 'text-slate-600' : 'text-gray-400';

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen pt-24 pb-20" style={t.pageBgStyle}>
      <div className="section-container">

        <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={fadeUp}>
          <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${isLight ? 'text-blue-600' : 'text-primary-400'}`}>Partner Ecosystem</p>
          <h1 className={`text-5xl sm:text-6xl font-black leading-tight mb-4 ${headingCls}`}>
            Build strategic growth with<br />
            <span className={t.gradientText}>USEMETA partnerships.</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${subTxtCls}`}>
            Collaborate with a premium partner network to deliver secure, modern software solutions that help your customers thrive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-20">
          {benefits.map(({ icon, title, desc }, index) => (
            <motion.div key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ transitionDelay: `${index * 0.07}s` }}
              className={`${cardCls} rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1`}>
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className={`text-xl font-bold mb-3 ${headingCls}`}>{title}</h3>
              <p className={`text-sm leading-relaxed ${subTxtCls}`}>{desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-20 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`${cardCls} rounded-3xl p-8`}>
            <h2 className={`text-3xl font-black mb-4 ${headingCls}`}>Why Partner With USEMETA</h2>
            <p className={`text-base leading-relaxed mb-6 ${subTxtCls}`}>
              USEMETA offers a premium partner programme built for organisations that want to grow with trusted enterprise-grade products.
            </p>
            <ul className="space-y-4">
              {[
                'Structured co-selling programs for sustained revenue acceleration.',
                'Dedicated enablement and product certification for partner teams.',
                'Robust platform integrations with strong technical guidance.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-primary-400">•</span>
                  <p className={`text-sm leading-relaxed ${subTxtCls}`}>{item}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`${cardCls} rounded-3xl p-8`}>
            <h2 className={`text-3xl font-black mb-4 ${headingCls}`}>Application Process</h2>
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <div key={step.title} className="rounded-3xl p-5 bg-white/5 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.28em] text-primary-400 mb-2">Step {index + 1}</p>
                  <h3 className={`text-lg font-bold ${headingCls}`}>{step.title}</h3>
                  <p className={`text-sm leading-relaxed ${subTxtCls}`}>{step.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mb-20">
          <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className={`text-3xl font-black mb-2 ${headingCls}`}>Partner Categories</h2>
            <p className={subTxtCls}>A diverse ecosystem for integrations, resale, consulting, and enterprise delivery.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {partnerTypes.map((type, index) => (
              <motion.div key={type.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                style={{ transitionDelay: `${index * 0.06}s` }}
                className={`${cardCls} rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1`}>
                <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 w-12 h-12">{type.name.charAt(0)}</div>
                <h3 className={`text-lg font-bold mb-2 ${headingCls}`}>{type.name}</h3>
                <p className={`text-sm ${subTxtCls}`}>{type.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.24em] text-primary-400">{type.category}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className={`text-3xl font-black mb-2 ${headingCls}`}>Success Stories</h2>
            <p className={subTxtCls}>Partners delivering measurable outcomes through joint product initiatives.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {stories.map((story, index) => (
              <motion.div key={story.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                style={{ transitionDelay: `${index * 0.08}s` }}
                className={`${cardCls} rounded-3xl p-8`}>
                <p className="text-xs uppercase tracking-[0.28em] text-primary-400 mb-3">{story.name}</p>
                <h3 className={`text-2xl font-black mb-4 ${headingCls}`}>{story.result}</h3>
                <p className={`text-sm leading-relaxed ${subTxtCls}`}>USEMETA provided the product expertise, integration support, and co-marketing engine behind each success story.</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className={`${cardCls} rounded-3xl p-10`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-primary-400 mb-3">Become a Partner</p>
              <h2 className={`text-3xl font-black mb-4 ${headingCls}`}>Apply to join the USEMETA network</h2>
              <p className={`text-sm leading-relaxed mb-8 ${subTxtCls}`}>
                Tell us about your business and partnership goals. We will follow up with a tailored plan and next steps.
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <input
                  name="name"
                  value={formState.name}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Your name"
                  className="input-field"
                  required
                />
                <input
                  name="email"
                  value={formState.email}
                  onChange={handleFormChange}
                  type="email"
                  placeholder="Business email"
                  className="input-field"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  name="company"
                  value={formState.company}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Company"
                  className="input-field"
                  required
                />
                <input
                  name="partnerType"
                  value={formState.partnerType}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Partner type"
                  className="input-field"
                  required
                />
              </div>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleFormChange}
                placeholder="Tell us about your opportunity"
                rows="5"
                className="input-field resize-none"
                required
              />
              <button type="submit" className="btn-primary w-full py-4">Submit application</button>
              {submitted && (
                <p className="text-sm text-emerald-400">Thanks! We’ll follow up with next steps within one business day.</p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
