import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';

/**
 * Floating circular theme switcher button.
 * Fixed bottom-right corner, always visible.
 *
 * Vision Mode  → ☀️  (warm light glow)
 * Infinity Mode → 🌙  (cool dark glow)
 */
export default function ThemeSwitcher() {
  const { theme, toggleTheme, switching } = useTheme();
  const [hovered, setHovered] = useState(false);
  const isInfinity = theme === THEMES.INFINITY;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl pointer-events-none whitespace-nowrap"
            style={{
              background: isInfinity ? 'rgba(15,10,40,0.95)' : 'rgba(255,255,255,0.95)',
              color: isInfinity ? '#e2e8f0' : '#1e293b',
              border: isInfinity ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.08)',
              boxShadow: isInfinity ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.1)',
            }}
          >
            {isInfinity ? '☀️ Switch to Vision Mode' : '🌙 Switch to Infinity Mode'}
            <br />
            <span style={{ opacity: 0.5, fontSize: 10 }}>Choose Your Experience</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={toggleTheme}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        disabled={switching}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isInfinity ? 'Switch to Vision Mode' : 'Switch to Infinity Mode'}
        className="relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: isInfinity
            ? 'linear-gradient(135deg,#1e1b4b,#312e81)'
            : 'linear-gradient(135deg,#fef3c7,#fbbf24)',
          boxShadow: isInfinity
            ? '0 0 0 2px rgba(99,102,241,0.5), 0 8px 32px rgba(99,102,241,0.4)'
            : '0 0 0 2px rgba(251,191,36,0.5), 0 8px 32px rgba(251,191,36,0.4)',
        }}
      >
        {/* Glow ring pulse */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isInfinity
              ? ['0 0 0px rgba(99,102,241,0)', '0 0 20px rgba(99,102,241,0.6)', '0 0 0px rgba(99,102,241,0)']
              : ['0 0 0px rgba(251,191,36,0)', '0 0 20px rgba(251,191,36,0.6)', '0 0 0px rgba(251,191,36,0)'],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Transition overlay */}
        <AnimatePresence>
          {switching && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ background: isInfinity ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        <AnimatePresence mode="wait">
          <motion.span
            key={theme}
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'backOut' }}
            className="text-2xl select-none relative z-10"
            style={{ filter: isInfinity ? 'drop-shadow(0 0 8px rgba(165,180,252,0.8))' : 'drop-shadow(0 0 8px rgba(251,191,36,0.8))' }}
          >
            {isInfinity ? '🌙' : '☀️'}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
