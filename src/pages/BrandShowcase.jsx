import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────
   Inline SVG components so the logos render perfectly
   without any asset-path issues.
───────────────────────────────────────────────────── */

/** Shared gradient defs — reused across all SVG marks */
function Defs({ id = 'um' }) {
  return (
    <defs>
      <linearGradient id={`${id}-gp`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#3B82F6" />
        <stop offset="55%"  stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
      <linearGradient id={`${id}-gwx`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#3B82F6" />
        <stop offset="50%"  stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
      <radialGradient id={`${id}-bg`} cx="40%" cy="35%" r="65%">
        <stop offset="0%"  stopColor="#1E293B" />
        <stop offset="100%" stopColor="#0F172A" />
      </radialGradient>
      <filter id={`${id}-glow`} x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id={`${id}-core`}>
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  );
}

/** The orbital icon mark — reusable at any scale */
function IconMark({ id = 'um', size = 100, bg = '#0F172A', rounded = 22 }) {
  const cx = size / 2, cy = size / 2;
  const r  = size * 0.36;
  const rE = size * 0.17;   // ellipse ry
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <Defs id={id} />

      {/* Background */}
      <rect width={size} height={size} rx={rounded} fill={bg} />
      <rect x="1" y="1" width={size - 2} height={size - 2} rx={rounded - 1}
            stroke={`url(#${id}-gp)`} strokeWidth="1" opacity="0.2" fill="none" />

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r}
              stroke={`url(#${id}-gp)`} strokeWidth={size * 0.017}
              strokeDasharray={`${r * 4.3} ${r * 2}`} strokeDashoffset={r * 0.78}
              strokeLinecap="round" opacity="0.3" filter={`url(#${id}-glow)`} />

      {/* Orbital ellipse 1 */}
      <ellipse cx={cx} cy={cy} rx={r} ry={rE}
               stroke={`url(#${id}-gp)`} strokeWidth={size * 0.017}
               strokeDasharray={`${r * 3.5} ${r * 2.5}`} strokeDashoffset={`${-r * 0.22}`}
               strokeLinecap="round" opacity="0.6"
               transform={`rotate(-35 ${cx} ${cy})`} filter={`url(#${id}-glow)`} />

      {/* Orbital ellipse 2 */}
      <ellipse cx={cx} cy={cy} rx={r} ry={rE}
               stroke={`url(#${id}-gp)`} strokeWidth={size * 0.017}
               strokeDasharray={`${r * 3.1} ${r * 3.1}`} strokeDashoffset={`${r * 0.5}`}
               strokeLinecap="round" opacity="0.6"
               transform={`rotate(35 ${cx} ${cy})`} filter={`url(#${id}-glow)`} />

      {/* S-curve (Santhosh tribute) */}
      <path
        d={`M ${cx * 1.14} ${cy * 0.5}
            C ${cx * 1.34} ${cy * 0.5}, ${cx * 1.44} ${cy * 0.66}, ${cx * 1.3} ${cy * 0.8}
            C ${cx * 1.16} ${cy * 0.94}, ${cx * 0.82} ${cy * 0.9}, ${cx * 0.68} ${cy * 1.04}
            C ${cx * 0.54} ${cy * 1.18}, ${cx * 0.66} ${cy * 1.44}, ${cx * 0.88} ${cy * 1.44}`}
        stroke={`url(#${id}-gp)`} strokeWidth={size * 0.028}
        strokeLinecap="round" fill="none"
        filter={`url(#${id}-glow)`} opacity="0.92"
      />

      {/* Core nucleus */}
      <circle cx={cx} cy={cy} r={size * 0.06} fill={`url(#${id}-gp)`} filter={`url(#${id}-core)`} />
      <circle cx={cx} cy={cy} r={size * 0.03} fill="white" opacity="0.9" />

      {/* Three orbital nodes */}
      <circle cx={cx}               cy={cy - r * 0.95} r={size * 0.038} fill="#3B82F6" opacity="0.95" filter={`url(#${id}-glow)`} />
      <circle cx={cx + r * 0.86}    cy={cy + r * 0.52} r={size * 0.038} fill="#8B5CF6" opacity="0.95" filter={`url(#${id}-glow)`} />
      <circle cx={cx - r * 0.86}    cy={cy + r * 0.52} r={size * 0.038} fill="#06B6D4" opacity="0.95" filter={`url(#${id}-glow)`} />

      {/* Spokes */}
      <line x1={cx} y1={cy - size * 0.06} x2={cx} y2={cy - r * 0.93}
            stroke={`url(#${id}-gp)`} strokeWidth={size * 0.011} opacity="0.35" />
      <line x1={cx + size * 0.055} y1={cy + size * 0.04} x2={cx + r * 0.82} y2={cy + r * 0.48}
            stroke={`url(#${id}-gp)`} strokeWidth={size * 0.011} opacity="0.35" />
      <line x1={cx - size * 0.055} y1={cy + size * 0.04} x2={cx - r * 0.82} y2={cy + r * 0.48}
            stroke={`url(#${id}-gp)`} strokeWidth={size * 0.011} opacity="0.35" />
    </svg>
  );
}

/** USEMETA geometric wordmark — pure SVG paths, no web fonts needed */
function Wordmark({ color = 'white', scale = 1 }) {
  const w = 210 * scale, h = 50 * scale;
  const sw = 4.8 * scale;
  return (
    <svg width={w} height={h} viewBox="0 0 210 50" fill="none">
      {/* U */}
      <path d={`M 2 4 L 2 30 Q 2 44 13 44 Q 24 44 24 30 L 24 4`}
            stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* S */}
      <path d={`M 48 12 C 43 6,32 6,32 17 C 32 24,43 26,46 32 C 49 38,44 44,36 44 C 30 44,27 41,25 39`}
            stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(6,0)" />
      {/* E */}
      <path d={`M 60 4 L 60 44 M 60 4 L 78 4 M 60 24 L 75 24 M 60 44 L 78 44`}
            stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* M */}
      <path d={`M 86 44 L 86 4 L 99 30 L 112 4 L 112 44`}
            stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* E */}
      <path d={`M 120 4 L 120 44 M 120 4 L 138 4 M 120 24 L 135 24 M 120 44 L 138 44`}
            stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* T */}
      <path d={`M 146 4 L 168 4 M 157 4 L 157 44`}
            stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* A */}
      <path d={`M 175 44 L 188 4 L 201 44 M 179.5 30 L 196.5 30`}
            stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/** Gradient wordmark variant */
function WordmarkGradient({ scale = 1, id = 'wg' }) {
  const sw = 4.8 * scale;
  return (
    <svg width={210 * scale} height={50 * scale} viewBox="0 0 210 50" fill="none">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#3B82F6" />
          <stop offset="50%"  stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <path d={`M 2 4 L 2 30 Q 2 44 13 44 Q 24 44 24 30 L 24 4`}
            stroke={`url(#${id})`} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={`M 48 12 C 43 6,32 6,32 17 C 32 24,43 26,46 32 C 49 38,44 44,36 44 C 30 44,27 41,25 39`}
            stroke={`url(#${id})`} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(6,0)" />
      <path d={`M 60 4 L 60 44 M 60 4 L 78 4 M 60 24 L 75 24 M 60 44 L 78 44`}
            stroke={`url(#${id})`} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={`M 86 44 L 86 4 L 99 30 L 112 4 L 112 44`}
            stroke={`url(#${id})`} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={`M 120 4 L 120 44 M 120 4 L 138 4 M 120 24 L 135 24 M 120 44 L 138 44`}
            stroke={`url(#${id})`} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={`M 146 4 L 168 4 M 157 4 L 157 44`}
            stroke={`url(#${id})`} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={`M 175 44 L 188 4 L 201 44 M 179.5 30 L 196.5 30`}
            stroke={`url(#${id})`} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   Full logo: Icon + Wordmark side by side
───────────────────────────────────────────────────── */
function FullLogo({ theme = 'dark', size = 'md' }) {
  const scales  = { sm: 0.6, md: 1, lg: 1.4, xl: 2 };
  const s = scales[size] ?? 1;
  const iconSize = 56 * s;
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0">
        <IconMark id={`fl-${theme}-${size}`} size={iconSize} bg={isDark ? '#0F172A' : '#0F172A'} rounded={Math.round(13 * s)} />
      </div>
      <div className="flex flex-col gap-1">
        <Wordmark color={isDark ? 'white' : '#0F172A'} scale={s * 0.72} />
        <p className={`font-semibold tracking-[0.22em] uppercase text-[${Math.round(7 * s)}px]`}
           style={{ fontSize: Math.round(7.5 * s), letterSpacing: '0.2em', color: isDark ? '#94A3B8' : '#64748B' }}>
          Transform Ideas Into Digital Reality
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Colour swatches
───────────────────────────────────────────────────── */
const palette = [
  { name: 'Deep Navy',    hex: '#0F172A', textLight: true,  role: 'Background / Dark UI' },
  { name: 'Electric Blue', hex: '#3B82F6', textLight: true,  role: 'Primary accent' },
  { name: 'Violet',       hex: '#8B5CF6', textLight: true,  role: 'Secondary accent' },
  { name: 'Cyan',         hex: '#06B6D4', textLight: true,  role: 'Tertiary / highlights' },
  { name: 'Slate 200',    hex: '#E2E8F0', textLight: false, role: 'Light UI / text' },
  { name: 'Slate 400',    hex: '#94A3B8', textLight: false, role: 'Tagline / muted text' },
];

/* ─────────────────────────────────────────────────────
   Logo card wrapper
───────────────────────────────────────────────────── */
function LogoCard({ label, bg, border, children, download, filename }) {
  function handleDownload() {
    const a = document.createElement('a');
    a.href = download;
    a.download = filename;
    a.click();
  }

  return (
    <motion.div
      className="rounded-3xl overflow-hidden border flex flex-col"
      style={{ background: bg, borderColor: border }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 flex items-center justify-center p-8 min-h-[160px]">
        {children}
      </div>
      <div className="px-5 py-3 border-t flex items-center justify-between" style={{ borderColor: border }}>
        <span className="text-xs font-medium text-slate-400">{label}</span>
        {download && (
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download SVG
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────── */
export default function BrandShowcase() {
  const [activeTab, setActiveTab] = useState('logos');
  const tabs = ['logos', 'icon', 'colors', 'typography', 'usage'];

  return (
    <main className="min-h-screen pt-24 pb-20"
          style={{ background: 'linear-gradient(180deg,#050010 0%,#0a0020 100%)' }}>
      <div className="section-container max-w-6xl">

        {/* ── Hero ── */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

          {/* Live animated logo */}
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ filter: ['drop-shadow(0 0 12px rgba(99,102,241,0.4))', 'drop-shadow(0 0 28px rgba(139,92,246,0.6))', 'drop-shadow(0 0 12px rgba(99,102,241,0.4))'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FullLogo theme="dark" size="xl" />
            </motion.div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            USEMETA <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">Brand Identity</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Official brand guidelines for USEMETA — a future-focused technology company by <span className="text-blue-400 font-semibold">Santhosh</span>.
          </p>

          {/* Tagline options */}
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {[
              'Transform Ideas Into Digital Reality',
              'The Future of Intelligent Products',
              'Innovation Beyond Limits',
            ].map((t) => (
              <span key={t} className="px-3 py-1.5 text-xs font-medium rounded-full border border-white/10 text-gray-400"
                    style={{ background: 'rgba(255,255,255,0.04)' }}>
                "{t}"
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Tabs ── */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all duration-200"
              style={{
                background: activeTab === tab ? 'linear-gradient(135deg,#3B82F6,#8B5CF6)' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab ? 'white' : '#94A3B8',
                border: activeTab === tab ? 'none' : '1px solid rgba(255,255,255,0.1)',
              }}>
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}>

            {/* ════════════════════ LOGOS TAB ════════════════════ */}
            {activeTab === 'logos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Full logo — Dark */}
                <LogoCard label="Full Logo — Dark Theme"
                          bg="#0F172A" border="rgba(255,255,255,0.08)"
                          download="/brand/usemeta-full-dark.svg" filename="usemeta-full-dark.svg">
                  <FullLogo theme="dark" size="md" />
                </LogoCard>

                {/* Full logo — Light */}
                <LogoCard label="Full Logo — Light Theme"
                          bg="#F8FAFC" border="rgba(0,0,0,0.08)"
                          download="/brand/usemeta-full-light.svg" filename="usemeta-full-light.svg">
                  <FullLogo theme="light" size="md" />
                </LogoCard>

                {/* Gradient wordmark */}
                <LogoCard label="Gradient Wordmark — Dark"
                          bg="#0F172A" border="rgba(255,255,255,0.08)"
                          download="/brand/usemeta-wordmark.svg" filename="usemeta-wordmark.svg">
                  <div className="flex flex-col items-center gap-3">
                    <WordmarkGradient scale={1} id="wg-card1" />
                    <div className="h-px w-4/5" style={{ background: 'linear-gradient(90deg,transparent,#8B5CF6,#06B6D4,transparent)' }} />
                    <p className="text-[10px] tracking-[0.28em] text-slate-500 uppercase font-semibold">
                      Transform Ideas Into Digital Reality
                    </p>
                  </div>
                </LogoCard>

                {/* Wordmark light */}
                <LogoCard label="Wordmark — Light Background"
                          bg="#F1F5F9" border="rgba(0,0,0,0.06)"
                          download="/brand/usemeta-wordmark.svg" filename="usemeta-wordmark-light.svg">
                  <div className="flex flex-col items-center gap-3">
                    <WordmarkGradient scale={1} id="wg-card2" />
                    <p className="text-[10px] tracking-[0.28em] text-slate-400 uppercase font-semibold">
                      Transform Ideas Into Digital Reality
                    </p>
                  </div>
                </LogoCard>
              </div>
            )}

            {/* ════════════════════ ICON TAB ════════════════════ */}
            {activeTab === 'icon' && (
              <div>
                {/* Large animated icon hero */}
                <div className="flex justify-center mb-10">
                  <motion.div
                    animate={{
                      filter: [
                        'drop-shadow(0 0 20px rgba(59,130,246,0.4))',
                        'drop-shadow(0 0 40px rgba(139,92,246,0.6))',
                        'drop-shadow(0 0 20px rgba(6,182,212,0.4))',
                        'drop-shadow(0 0 20px rgba(59,130,246,0.4))',
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <IconMark id="hero-icon" size={180} rounded={38} />
                  </motion.div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: '256px — App Icon', size: 120, rounded: 28, bg: '#0F172A' },
                    { label: '64px — Toolbar', size: 64,  rounded: 14, bg: '#0F172A' },
                    { label: '32px — Favicon',  size: 32,  rounded: 7,  bg: '#0F172A' },
                    { label: '16px — Micro',    size: 16,  rounded: 4,  bg: '#0F172A' },
                  ].map(({ label, size, rounded, bg }, i) => (
                    <LogoCard key={label} label={label} bg="#1E293B" border="rgba(255,255,255,0.07)"
                              download="/brand/usemeta-icon.svg" filename={`usemeta-icon-${size}.svg`}>
                      <IconMark id={`sz-${i}`} size={size} rounded={rounded} bg={bg} />
                    </LogoCard>
                  ))}
                </div>

                {/* White / coloured backgrounds */}
                <div className="mt-5 grid grid-cols-3 gap-4">
                  {[
                    { label: 'On White',  bg: '#FFFFFF', border: 'rgba(0,0,0,0.07)' },
                    { label: 'On Slate',  bg: '#1E293B', border: 'rgba(255,255,255,0.07)' },
                    { label: 'On Violet', bg: '#2E1065', border: 'rgba(139,92,246,0.25)' },
                  ].map(({ label, bg, border }, i) => (
                    <LogoCard key={label} label={label} bg={bg} border={border}>
                      <IconMark id={`bg-${i}`} size={72} rounded={16} bg={i === 0 ? '#0F172A' : 'rgba(255,255,255,0.04)'} />
                    </LogoCard>
                  ))}
                </div>

                {/* Design notes */}
                <div className="mt-6 rounded-2xl p-6 border border-white/8" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <h3 className="text-sm font-bold text-white mb-3">Icon Design Notes</h3>
                  <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
                    <li className="flex gap-2"><span className="text-blue-400">●</span> Three interlocked orbital arcs represent <strong className="text-white">connectivity, innovation, and infinite possibility</strong></li>
                    <li className="flex gap-2"><span className="text-violet-400">●</span> The flowing S-curve subtly encodes the founder initial <strong className="text-white">S (Santhosh)</strong> — visible as a connectivity arc</li>
                    <li className="flex gap-2"><span className="text-cyan-400">●</span> Three orbital nodes (Blue, Violet, Cyan) represent the three product pillars: <strong className="text-white">Software · Cloud · Digital</strong></li>
                    <li className="flex gap-2"><span className="text-emerald-400">●</span> Central nucleus symbolises the <strong className="text-white">core platform</strong> radiating outward to all connections</li>
                  </ul>
                </div>
              </div>
            )}

            {/* ════════════════════ COLORS TAB ════════════════════ */}
            {activeTab === 'colors' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {palette.map(({ name, hex, textLight, role }) => (
                    <motion.div key={hex}
                      className="rounded-2xl overflow-hidden border border-white/8 cursor-pointer group"
                      whileHover={{ scale: 1.03 }}
                      onClick={() => navigator.clipboard?.writeText(hex)}
                    >
                      <div className="h-24 relative" style={{ background: hex }}>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                             style={{ background: 'rgba(0,0,0,0.2)' }}>
                          <span className={`text-xs font-bold ${textLight ? 'text-white' : 'text-slate-700'}`}>
                            Copy HEX
                          </span>
                        </div>
                      </div>
                      <div className="p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <p className="text-sm font-bold text-white">{name}</p>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{hex}</p>
                        <p className="text-xs text-slate-500 mt-1">{role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Gradient swatch */}
                <div className="rounded-2xl overflow-hidden border border-white/8">
                  <div className="h-16" style={{ background: 'linear-gradient(90deg,#3B82F6,#8B5CF6,#06B6D4)' }} />
                  <div className="p-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <p className="text-sm font-bold text-white">Primary Gradient</p>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">linear-gradient(90deg, #3B82F6, #8B5CF6, #06B6D4)</p>
                    <p className="text-xs text-slate-500 mt-1">Used on icon mark, underlines, CTA buttons, and hover states</p>
                  </div>
                </div>

                {/* Dark gradient */}
                <div className="rounded-2xl overflow-hidden border border-white/8">
                  <div className="h-16" style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B,#0F172A)' }} />
                  <div className="p-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <p className="text-sm font-bold text-white">Background Gradient</p>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">linear-gradient(135deg, #0F172A, #1E293B, #0F172A)</p>
                    <p className="text-xs text-slate-500 mt-1">Dark UI backgrounds, cards, and icon tile</p>
                  </div>
                </div>
              </div>
            )}

            {/* ════════════════════ TYPOGRAPHY TAB ════════════════════ */}
            {activeTab === 'typography' && (
              <div className="space-y-5">
                {[
                  { role: 'Hero / Display',  size: '48px', weight: '900 Black', sample: 'USEMETA', gradient: true },
                  { role: 'Section Title',   size: '32px', weight: '800 ExtraBold', sample: 'Transform Ideas Into Digital Reality' },
                  { role: 'Sub-heading',     size: '20px', weight: '700 Bold', sample: 'AI-Powered SaaS Products' },
                  { role: 'Body',            size: '15px', weight: '400 Regular', sample: 'USEMETA helps businesses transform ideas into intelligent digital products through innovation and scalable technology.' },
                  { role: 'Tagline / Label', size: '11px', weight: '600 SemiBold', sample: 'TRANSFORM IDEAS INTO DIGITAL REALITY', mono: true },
                ].map(({ role, size, weight, sample, gradient, mono }) => (
                  <div key={role} className="rounded-2xl p-6 border border-white/8" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-baseline justify-between gap-4 mb-3">
                      <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">{role}</span>
                      <span className="text-xs text-slate-500 font-mono">{size} · {weight}</span>
                    </div>
                    <p className={`leading-tight ${mono ? 'tracking-[0.22em] uppercase' : ''}`}
                       style={{
                         fontSize: size,
                         fontWeight: weight.split(' ')[0],
                         fontFamily: 'system-ui, -apple-system, sans-serif',
                         color: gradient ? 'transparent' : 'white',
                         background: gradient ? 'linear-gradient(90deg,#3B82F6,#8B5CF6,#06B6D4)' : undefined,
                         WebkitBackgroundClip: gradient ? 'text' : undefined,
                         backgroundClip: gradient ? 'text' : undefined,
                       }}>
                      {sample}
                    </p>
                  </div>
                ))}
                <div className="rounded-2xl p-5 border border-white/8 text-xs text-slate-400 leading-relaxed" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-white font-semibold">Font Stack: </span>
                  Inter (primary) → system-ui → -apple-system → Segoe UI → sans-serif
                </div>
              </div>
            )}

            {/* ════════════════════ USAGE TAB ════════════════════ */}
            {activeTab === 'usage' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Do */}
                <div className="rounded-2xl p-6 border" style={{ background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-emerald-400">Do</h3>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    {['Use the logo on dark (#0F172A) or white backgrounds only','Maintain minimum clear space = 1× icon width around logo','Use gradient wordmark version on dark or neutral backgrounds','Use icon-only on very small sizes (below 40px)','Always use the approved colour palette','Use Inter or system-ui as the companion typeface'].map((t) => (
                      <li key={t} className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span>{t}</li>
                    ))}
                  </ul>
                </div>

                {/* Don't */}
                <div className="rounded-2xl p-6 border" style={{ background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.2)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-red-400">Don't</h3>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    {["Don't rotate, skew, or distort the logo","Don't change the gradient colours","Don't place the logo on busy photographic backgrounds","Don't use low-contrast colour combinations","Don't add drop shadows or outer glows beyond brand spec","Don't stretch the wordmark independently of the icon"].map((t) => (
                      <li key={t} className="flex gap-2"><span className="text-red-400 flex-shrink-0">✗</span>{t}</li>
                    ))}
                  </ul>
                </div>

                {/* File formats */}
                <div className="md:col-span-2 rounded-2xl p-6 border border-white/8" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <h3 className="text-sm font-bold text-white mb-4">Available Files</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { file: 'usemeta-full-dark.svg',  label: 'Full Logo Dark',  icon: '🌑' },
                      { file: 'usemeta-full-light.svg', label: 'Full Logo Light', icon: '☀️' },
                      { file: 'usemeta-icon.svg',       label: 'Icon Only',       icon: '⬡' },
                      { file: 'usemeta-wordmark.svg',   label: 'Wordmark',        icon: 'Aa' },
                      { file: 'usemeta-favicon.svg',    label: 'Favicon',         icon: '📌' },
                    ].map(({ file, label, icon }) => (
                      <a key={file} href={`/brand/${file}`} download={file}
                         className="flex items-center gap-3 p-3 rounded-xl border border-white/8 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group">
                        <span className="text-xl">{icon}</span>
                        <div>
                          <p className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">{label}</p>
                          <p className="text-[10px] text-slate-500 font-mono">.svg</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* ── Footer brand credit ── */}
        <motion.div className="mt-16 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/8"
               style={{ background: 'rgba(255,255,255,0.03)' }}>
            <IconMark id="footer-icon" size={28} rounded={7} />
            <div className="text-left">
              <p className="text-xs font-bold text-white">USEMETA Brand Guidelines</p>
              <p className="text-[10px] text-slate-500">Founded by Santhosh · SaaS · AI · Cloud · Digital Products</p>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
