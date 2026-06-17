import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

/**
 * Product marketplace page — search, filter, and browse all products.
 */
export default function Products() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  // Keep search query in sync with URL param (from navbar search)
  useEffect(() => {
    const s = searchParams.get('search');
    if (s) setQuery(s);
  }, [searchParams]);

  // Filter + sort products
  const filtered = useMemo(() => {
    let list = [...products];

    // Text search
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
      default: /* popular — keep original order */ break;
    }

    return list;
  }, [query, activeCategory, sortBy]);

  return (
    <main className="min-h-screen bg-mesh pt-24 pb-20">
      <div className="section-container">

        {/* ── Page header ── */}
        <div className="text-center mb-12 animate-slide-up">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-400 mb-3">Marketplace</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Explore Our <span className="gradient-text">Products</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-lg mx-auto">
            Discover intelligent SaaS tools built for modern teams. Find the perfect product for your workflow.
          </p>
        </div>

        {/* ── Search & Filter bar ── */}
        <div className="glass rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search input */}
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, categories..."
              className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-primary-500 transition-all cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* ── Category pills ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200
                ${activeCategory === cat
                  ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'glass glass-hover border-white/10 text-gray-400 hover:text-white'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Results count ── */}
        <p className="text-sm text-gray-500 mb-6">
          Showing <span className="text-white font-medium">{filtered.length}</span> of {products.length} products
          {query && <span> for "<span className="text-primary-400">{query}</span>"</span>}
        </p>

        {/* ── Products grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory('All'); }}
              className="mt-6 btn-secondary text-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
