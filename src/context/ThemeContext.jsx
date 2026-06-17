import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * ThemeContext — Emotional Theme System
 *
 * VISION MODE  (light) — Hope · Creativity · Growth · Productivity
 * INFINITY MODE (dark) — Power · Intelligence · Focus · Innovation
 *
 * Persisted to localStorage under key 'usemeta_theme'.
 */

const ThemeContext = createContext(null);

export const THEMES = {
  VISION:   'vision',    // light
  INFINITY: 'infinity',  // dark
};

// Token maps consumed by every component via useTheme()
export const themeTokens = {
  [THEMES.VISION]: {
    id:           THEMES.VISION,
    name:         'Vision Mode',
    icon:         '☀️',
    // Backgrounds
    pageBg:       'bg-slate-50',
    pageBgStyle:  { background: 'linear-gradient(135deg,#f8faff 0%,#eef2ff 40%,#f0fdf4 100%)' },
    cardBg:       'bg-white/70 backdrop-blur-xl border border-slate-200/80',
    navBg:        'bg-white/80 backdrop-blur-xl border-b border-slate-200/60',
    footerBg:     'bg-white border-t border-slate-200',
    // Text
    textPrimary:  'text-slate-900',
    textSecondary:'text-slate-600',
    textMuted:    'text-slate-400',
    textAccent:   'text-blue-600',
    // Gradient text
    gradientText: 'bg-gradient-to-r from-blue-600 via-violet-500 to-sky-500 bg-clip-text text-transparent',
    // Buttons
    btnPrimary:   'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-lg shadow-blue-200',
    btnSecondary: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300',
    // Borders
    border:       'border-slate-200',
    borderHover:  'hover:border-blue-300',
    // Input
    inputBg:      'bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500',
    // Particles / effects
    particleA:    'rgba(99,102,241,0.4)',
    particleB:    'rgba(139,92,246,0.3)',
    particleC:    'rgba(6,182,212,0.3)',
    // Hero greeting
    heroGreeting: 'Welcome To Vision Mode',
    heroTagline:  'Build The Future With Confidence',
    // Glass
    glass:        'bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm',
  },
  [THEMES.INFINITY]: {
    id:           THEMES.INFINITY,
    name:         'Infinity Mode',
    icon:         '🌙',
    pageBg:       'bg-dark-900',
    pageBgStyle:  { background: 'linear-gradient(135deg,#050010 0%,#0a0020 50%,#020010 100%)' },
    cardBg:       'bg-white/5 backdrop-blur-xl border border-white/10',
    navBg:        'bg-dark-900/80 backdrop-blur-xl border-b border-white/8',
    footerBg:     'bg-dark-900 border-t border-white/8',
    textPrimary:  'text-white',
    textSecondary:'text-gray-400',
    textMuted:    'text-gray-600',
    textAccent:   'text-blue-400',
    gradientText: 'bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent',
    btnPrimary:   'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-900/40',
    btnSecondary: 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20',
    border:       'border-white/10',
    borderHover:  'hover:border-white/20',
    inputBg:      'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-indigo-500',
    particleA:    'rgba(99,102,241,0.6)',
    particleB:    'rgba(139,92,246,0.5)',
    particleC:    'rgba(6,182,212,0.4)',
    heroGreeting: 'Welcome To Infinity Mode',
    heroTagline:  'Enter The Future Of Innovation',
    glass:        'bg-white/5 backdrop-blur-xl border border-white/10',
  },
};

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(THEMES.INFINITY);
  const [switching, setSwitching] = useState(false);

  // Rehydrate from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('usemeta_theme');
    if (saved === THEMES.VISION || saved === THEMES.INFINITY) {
      setThemeState(saved);
    }
  }, []);

  // Apply theme class to <html> for Tailwind dark: selector if needed
  useEffect(() => {
    const root = document.documentElement;
    if (theme === THEMES.INFINITY) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(async () => {
    setSwitching(true);
    // Brief transition window
    await new Promise((r) => setTimeout(r, 150));
    setThemeState((prev) => {
      const next = prev === THEMES.INFINITY ? THEMES.VISION : THEMES.INFINITY;
      localStorage.setItem('usemeta_theme', next);
      return next;
    });
    await new Promise((r) => setTimeout(r, 150));
    setSwitching(false);
  }, []);

  const t = themeTokens[theme]; // shorthand tokens

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switching, t, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
