import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const productBenefits = [
  { title: 'Enterprise-grade reliability', desc: 'Secure SaaS products built for high availability and global operations.' },
  { title: 'Tailored product categories', desc: 'Find the right solution fast with curated categories and intelligent search.' },
  { title: 'Premium workflow experience', desc: 'Designed for teams that need clarity, speed, and predictable outcomes.' },
];

/**
 * Product marketplace page — search, filter, and browse all products.
 */
export default function Products() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const toggleCompare = (productId) => {
    setSelectedProducts((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId].slice(-3)
    );
  };

  const clearComparison = () => setSelectedProducts([]);

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
            Discover software tools and digital platforms built for modern teams. Find the right product for your workflow.
          </p>
        </div>

        {/* ── Product benefits ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {productBenefits.map((benefit) => (
            <div key={benefit.title} className="glass rounded-3xl p-6 border border-white/10 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
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

        {selectedProducts.length > 1 && (
          <div className="glass rounded-3xl p-5 mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border border-white/10 shadow-lg shadow-primary-500/10">
            <div>
              <p className="text-sm text-primary-400 font-semibold uppercase tracking-[0.24em] mb-2">Product Comparison</p>
              <p className="text-sm text-gray-300">
                {selectedProducts.length} products selected. Compare pricing, ratings, and feature highlights side by side.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={clearComparison}
                className="px-4 py-2 rounded-xl text-sm font-medium glass glass-hover text-white/80 hover:text-white"
              >
                Clear selection
              </button>
            </div>
          </div>
        )}

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

        {selectedProducts.length > 1 && (
          <div className="glass rounded-3xl p-6 mb-8 border border-white/10 shadow-lg shadow-primary-500/10">
            <h2 className="text-lg font-bold text-white mb-4">Compare Selected Products</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border-separate border-spacing-0">
                <thead>
                  <tr className="text-gray-400 uppercase text-[11px] tracking-[0.24em]">
                    <th className="py-3 pr-4">Feature</th>
                    {selectedProducts.map((id) => {
                      const product = products.find((item) => item.id === id);
                      return (
                        <th key={id} className="py-3 px-4 text-white font-semibold">{product?.name}</th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td className="py-4 pr-4 text-gray-300">Category</td>
                    {selectedProducts.map((id) => {
                      const product = products.find((item) => item.id === id);
                      return <td key={id} className="py-4 px-4 text-white">{product?.category}</td>;
                    })}
                  </tr>
                  <tr className="border-t border-white/10 bg-white/5">
                    <td className="py-4 pr-4 text-gray-300">Monthly Price</td>
                    {selectedProducts.map((id) => {
                      const product = products.find((item) => item.id === id);
                      return <td key={id} className="py-4 px-4 text-white">${product?.price}</td>;
                    })}
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="py-4 pr-4 text-gray-300">Rating</td>
                    {selectedProducts.map((id) => {
                      const product = products.find((item) => item.id === id);
                      return <td key={id} className="py-4 px-4 text-white">{product?.rating} / 5</td>;
                    })}
                  </tr>
                  <tr className="border-t border-white/10 bg-white/5">
                    <td className="py-4 pr-4 text-gray-300">Top Feature</td>
                    {selectedProducts.map((id) => {
                      const product = products.find((item) => item.id === id);
                      return <td key={id} className="py-4 px-4 text-white">{product?.features[0]}</td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Products grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selected={selectedProducts.includes(product.id)}
                onToggleCompare={toggleCompare}
              />
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
