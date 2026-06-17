import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useTheme, THEMES } from '../context/ThemeContext';

/**
 * Global search bar with live product suggestions dropdown.
 */
export default function SearchBar({ className = '' }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState([]);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === THEMES.VISION;

  const wrapCls = isLight
    ? `flex items-center gap-2 px-3 py-2 bg-slate-50 border rounded-xl transition-all duration-300 ${focused ? 'border-blue-400/80 shadow-lg shadow-blue-100' : 'border-slate-200 hover:border-slate-300'}`
    : `flex items-center gap-2 px-3 py-2 bg-white/5 border rounded-xl transition-all duration-300 ${focused ? 'border-primary-500/60 shadow-lg shadow-primary-500/10' : 'border-white/10 hover:border-white/20'}`;

  const inputCls = isLight
    ? 'bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none w-40 lg:w-52'
    : 'bg-transparent text-sm text-white placeholder-gray-500 outline-none w-40 lg:w-52';

  const dropCls = isLight
    ? 'absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-xl overflow-hidden z-50 shadow-2xl shadow-black/10'
    : 'absolute top-full mt-2 left-0 right-0 bg-dark-800/95 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl';

  // Filter products on query change
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    setResults(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      ).slice(0, 5)
    );
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function handleSelect(id) {
    setQuery('');
    setFocused(false);
    navigate(`/products/${id}`);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setFocused(false);
    }
  }

  const showDropdown = focused && query.trim().length >= 2;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        className={`
          flex items-center gap-2 px-3 py-2
          bg-white/5 border rounded-xl
          transition-all duration-300
          ${focused ? 'border-primary-500/60 bg-white/8 shadow-lg shadow-primary-500/10' : 'border-white/10 hover:border-white/20'}
        `}
      >
        {/* Search icon */}
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-40 lg:w-52"
          aria-label="Search products"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {showDropdown && (
        <div className="absolute top-full mt-2 left-0 right-0 glass border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl animate-slide-down">
          {results.length > 0 ? (
            results.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left group"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate group-hover:gradient-text">{p.name}</p>
                  <p className="text-xs text-gray-500 truncate">{p.tagline}</p>
                </div>
                <span className="text-xs text-primary-400 flex-shrink-0">${p.price}/mo</span>
              </button>
            ))
          ) : (
            <div className="px-4 py-4 text-sm text-gray-500 text-center">
              No products found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
