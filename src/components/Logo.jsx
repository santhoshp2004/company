import { Link } from 'react-router-dom';
import { useTheme, THEMES } from '../context/ThemeContext';

/**
 * USEMETA Logo — adapts to Vision / Infinity theme.
 * Click navigates to home. Hover: scale + glow ring.
 */
export default function Logo() {
  const { theme } = useTheme();
  const isLight = theme === THEMES.VISION;

  return (
    <Link
      to="/"
      className="flex items-center gap-3 group select-none"
      aria-label="USEMETA Home"
    >
      {/* Icon mark */}
      <div className="relative w-9 h-9 flex-shrink-0">
        <div
          className="
            w-9 h-9 rounded-xl flex items-center justify-center
            transition-all duration-300
            group-hover:scale-110 group-hover:rotate-6
          "
          style={{
            background: 'linear-gradient(135deg,#3B82F6,#8B5CF6,#06B6D4)',
            boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
          }}
        >
          {/* USEMETA orbital icon condensed */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1" strokeDasharray="28 16" strokeLinecap="round" opacity="0.5"/>
            <ellipse cx="10" cy="10" rx="7" ry="3.4" stroke="white" strokeWidth="1"
                     strokeDasharray="22 20" strokeLinecap="round" opacity="0.7"
                     transform="rotate(-35 10 10)"/>
            {/* S-curve (Santhosh) */}
            <path d="M 11.5 5 C 14 5,15 7,13.2 8.5 C 11.4 10,8 9.5,7 11 C 6 12.5,7.2 15,9 15"
                  stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
            {/* Core */}
            <circle cx="10" cy="10" r="1.5" fill="white"/>
            {/* Orbital nodes */}
            <circle cx="10"  cy="3.2" r="1" fill="#60a5fa"/>
            <circle cx="15.4" cy="12.8" r="1" fill="#c084fc"/>
            <circle cx="4.6" cy="12.8" r="1" fill="#22d3ee"/>
          </svg>
        </div>
        {/* Hover ring */}
        <div className="
          absolute inset-0 rounded-xl border-2 border-blue-400/0
          group-hover:border-blue-400/60
          scale-100 group-hover:scale-125
          opacity-0 group-hover:opacity-100
          transition-all duration-500
        "/>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className="text-xl font-black tracking-tight"
          style={{ background: 'linear-gradient(90deg,#3B82F6,#8B5CF6,#06B6D4)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
        >
          USEMETA
        </span>
        <span className={`text-[10px] font-semibold tracking-widest uppercase ${isLight ? 'text-slate-400' : 'text-gray-500'}`}>
          by Santhosh
        </span>
      </div>
    </Link>
  );
}
