import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useTheme, THEMES } from '../context/ThemeContext';

/* ── Trusted partners ── */
const trustedCompanies = ['TechCorp', 'BuildBase', 'CloudEdge', 'DataBridge', 'SoftWave', 'NetForge', 'CodeNest'];

/* ── Testimonials ── */
const testimonials = [
  {
    name: 'Emily Chen',
    role: 'CTO at BuildBase',
    avatar: 'E',
    color: 'from-pink-500 to-rose-500',
    quote: "USEMETA's platform helped us ship 3× faster. The products integrate seamlessly and the support team is world-class.",
    stars: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'VP Engineering, CloudEdge',
    avatar: 'M',
    color: 'from-blue-500 to-cyan-500',
    quote: 'We replaced four separate software tools with USEMETA products. Our stack is leaner, faster, and our team loves it.',
    stars: 5,
  },
  {
    name: 'Aisha Patel',
    role: 'Head of Product, DataBridge',
    avatar: 'A',
    color: 'from-purple-500 to-indigo-500',
    quote: 'The analytics and workflow tools are best in class. Return on investment was clear within the first month.',
    stars: 5,
  },
];

/* ── Product advantages ── */
const advantages = [
  {
    icon: '⚡',
    title: 'High-Performance Infrastructure',
    desc: 'Sub-50ms API responses delivered by a globally distributed cloud network across 35 data centres.',
  },
  {
    icon: '🔒',
    title: 'Enterprise-Grade Security',
    desc: 'SOC2 Type II certified, end-to-end encryption, zero-knowledge architecture, and a 99.99% uptime SLA.',
  },
  {
    icon: '🛠️',
    title: 'Purpose-Built Software',
    desc: 'Every product is engineered for real business problems — clean APIs, clear documentation, and straightforward integration.',
  },
  {
    icon: '🔌',
    title: 'Deep Integrations',
    desc: 'Connect with 500+ tools out of the box. Our open API lets you build any custom integration your workflow needs.',
  },
  {
    icon: '📊',
    title: 'Unified Analytics',
    desc: 'One dashboard to monitor all your products. Actionable insights with automated anomaly alerts.',
  },
  {
    icon: '🌍',
    title: 'Global Scale',
    desc: 'Trusted by 10,000+ organisations across 80 countries — from early-stage startups to large enterprises.',
  },
];

/* ── Scroll animation variant ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

function Section({ children, className = '' }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { theme, t } = useTheme();
  const isLight = theme === THEMES.VISION;

  const cardCls   = isLight ? 'bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-sm' : 'bg-white/5 backdrop-blur-md border border-white/10';
  const mutedTxt  = isLight ? 'text-slate-500' : 'text-gray-400';
  const headingCls= isLight ? 'text-slate-900' : 'text-white';
  const subTxtCls = isLight ? 'text-slate-600' : 'text-gray-400';
  const divider   = isLight ? 'border-slate-200' : 'border-white/5';
  const chipCls   = isLight ? 'bg-blue-50 border border-blue-100 text-blue-700' : 'bg-white/5 border border-white/10 text-gray-300';

  return (
    <main style={t.pageBgStyle}>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background */}
        <div className={`absolute inset-0 ${isLight ? 'bg-grid-light' : 'bg-grid'} opacity-40 pointer-events-none`}/>
        {isLight ? (
          <>
            <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none" style={{background:'radial-gradient(circle,rgba(99,102,241,0.5),transparent)'}}/>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none" style={{background:'radial-gradient(circle,rgba(139,92,246,0.4),transparent)'}}/>
          </>
        ) : (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-float pointer-events-none"/>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl animate-float-delayed pointer-events-none"/>
          </>
        )}

        <div className="section-container relative z-10 py-20">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border ${chipCls}`}>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/>
              <span className="text-sm font-medium">Trusted by 10,000+ organisations worldwide</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
              className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 ${headingCls}`}>
              Building Digital Products<br/>
              <span className={t.gradientText}>For Modern Businesses</span>
            </motion.h1>

            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
              className={`text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10 ${subTxtCls}`}>
              USEMETA helps organisations grow through modern software solutions, scalable platforms, and digital services designed for long-term success.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4}}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register"
                className="px-8 py-4 text-base font-bold text-white rounded-2xl transition-all duration-300 hover:-translate-y-1 min-w-[180px]"
                style={{background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',boxShadow:'0 8px 30px rgba(59,130,246,0.35)'}}>
                Get Started Free
              </Link>
              <Link to="/products"
                className={`px-8 py-4 text-base font-bold rounded-2xl transition-all duration-300 hover:-translate-y-1 min-w-[180px] flex items-center gap-2 border ${isLight?'bg-white/70 border-slate-200 text-slate-700 hover:border-blue-300':'bg-white/5 border-white/15 text-white hover:bg-white/10'}`}>
                Explore Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.5}}
              className="mt-16 grid grid-cols-3 max-w-lg mx-auto gap-8">
              {[{value:'10K+',label:'Organisations'},{value:'99.99%',label:'Uptime SLA'},{value:'500+',label:'Integrations'}].map(({value,label})=>(
                <div key={label} className="text-center">
                  <div className={`text-2xl sm:text-3xl font-black ${t.gradientText}`}>{value}</div>
                  <div className={`text-xs font-medium mt-1 ${mutedTxt}`}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{background:`linear-gradient(to top,${isLight?'#f8faff':'#050010'},transparent)`}}/>
      </section>

      {/* ══════════════ TRUSTED BY ══════════════ */}
      <section className={`py-14 border-y ${divider}`}>
        <div className="section-container">
          <p className={`text-center text-xs font-semibold tracking-widest uppercase mb-8 ${mutedTxt}`}>
            Trusted by world-class teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
            {trustedCompanies.map((name) => (
              <span key={name} className={`font-bold text-lg tracking-tight cursor-default transition-colors duration-300 ${isLight?'text-slate-300 hover:text-slate-500':'text-gray-700 hover:text-gray-400'}`}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURED PRODUCTS ══════════════ */}
      <section className="py-24">
        <div className="section-container">
          <Section className="text-center mb-14">
            <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${isLight?'text-blue-600':'text-primary-400'}`}>Our Products</p>
            <h2 className={`text-4xl sm:text-5xl font-black leading-tight ${headingCls}`}>
              Everything your team needs,<br/>
              <span className={t.gradientText}>in one platform</span>
            </h2>
            <p className={`mt-4 max-w-xl mx-auto ${subTxtCls}`}>
              Six powerful software products designed to work together — each best-in-class on its own, unstoppable as a suite.
            </p>
          </Section>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div key={product.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.07,duration:0.45}}>
                <ProductCard product={product}/>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/products"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all duration-300 hover:-translate-y-0.5
                ${isLight?'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600':'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'}`}>
              View All Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ ADVANTAGES ══════════════ */}
      <section className={`py-24 ${isLight?'bg-slate-50/60':'bg-white/2'}`}>
        <div className="section-container">
          <Section className="text-center mb-14">
            <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${isLight?'text-blue-600':'text-primary-400'}`}>Why USEMETA</p>
            <h2 className={`text-4xl sm:text-5xl font-black leading-tight ${headingCls}`}>
              Built different,<br/>
              <span className={t.gradientText}>from the ground up</span>
            </h2>
          </Section>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map(({ icon, title, desc }, i) => (
              <motion.div key={title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.07}}
                className={`${cardCls} rounded-2xl p-6 group transition-all duration-300 hover:-translate-y-1`}>
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className={`text-lg font-bold mb-2 group-hover:${t.gradientText} transition-all duration-300 ${headingCls}`}>{title}</h3>
                <p className={`text-sm leading-relaxed ${subTxtCls}`}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="py-24">
        <div className="section-container">
          <Section className="text-center mb-14">
            <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${isLight?'text-blue-600':'text-primary-400'}`}>Testimonials</p>
            <h2 className={`text-4xl sm:text-5xl font-black leading-tight ${headingCls}`}>
              Loved by engineering<br/>
              <span className={t.gradientText}>teams globally</span>
            </h2>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, avatar, color, quote, stars }, i) => (
              <motion.div key={name} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.1}}
                className={`${cardCls} rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1`}>
                <div className="flex gap-1">
                  {Array.from({length:stars}).map((_,j)=>(
                    <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className={`text-sm leading-relaxed flex-1 ${subTxtCls}`}>"{quote}"</p>
                <div className={`flex items-center gap-3 pt-2 border-t ${divider}`}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>{avatar}</div>
                  <div>
                    <p className={`text-sm font-semibold ${headingCls}`}>{name}</p>
                    <p className={`text-xs ${mutedTxt}`}>{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="py-24">
        <div className="section-container">
          <Section>
            <div className={`relative rounded-3xl overflow-hidden ${cardCls} p-12 text-center`}>
              <div className="absolute inset-0 pointer-events-none"
                style={{background:'linear-gradient(135deg,rgba(59,130,246,0.08),rgba(139,92,246,0.06),rgba(6,182,212,0.05))'}}/>
              <div className="relative z-10">
                <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${isLight?'text-blue-600':'text-primary-400'}`}>Get Started Today</p>
                <h2 className={`text-4xl sm:text-5xl font-black leading-tight mb-4 ${headingCls}`}>Ready to build faster?</h2>
                <p className={`max-w-lg mx-auto mb-8 ${subTxtCls}`}>
                  Join 10,000+ organisations already using USEMETA. Start free, no credit card required. Upgrade as you grow.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/register"
                    className="px-8 py-4 text-base font-bold text-white rounded-2xl transition-all duration-300 hover:-translate-y-1"
                    style={{background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',boxShadow:'0 8px 30px rgba(59,130,246,0.35)'}}>
                    Start Free Trial
                  </Link>
                  <Link to="/products"
                    className={`px-8 py-4 text-base font-bold rounded-2xl border transition-all duration-300 hover:-translate-y-1
                      ${isLight?'bg-white border-slate-200 text-slate-700 hover:border-blue-300':'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}>
                    See All Products
                  </Link>
                </div>
                <p className={`mt-5 text-xs ${mutedTxt}`}>14-day free trial · No credit card required · Cancel anytime</p>
              </div>
            </div>
          </Section>
        </div>
      </section>
    </main>
  );
}
