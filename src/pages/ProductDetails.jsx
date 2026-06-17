import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductById, products } from '../data/products';
import { useAuth } from '../context/AuthContext';

/**
 * Full product detail page — image, description, features, pricing, reviews.
 */
export default function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!product) {
    return (
      <main className="min-h-screen bg-mesh flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">😕</p>
          <h2 className="text-2xl font-bold text-white mb-2">Product not found</h2>
          <Link to="/products" className="btn-primary mt-4 inline-flex">Back to Products</Link>
        </div>
      </main>
    );
  }

  const {
    name, tagline, longDescription, description, image, price, priceYearly,
    rating, reviewCount, features, reviews, category, badge, badgeColor,
  } = product;

  // Other products to suggest
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  function handleSubscribe() {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <main className="min-h-screen bg-mesh pt-24 pb-20">
      <div className="section-container">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white font-medium">{name}</span>
        </div>

        {/* ── Hero product section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden h-80 lg:h-auto min-h-72 group">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-transparent to-transparent" />
            {badge && (
              <div className={`absolute top-4 left-4 px-3 py-1 text-sm font-bold text-white rounded-full bg-gradient-to-r ${badgeColor} shadow-lg`}>
                {badge}
              </div>
            )}
            <div className="absolute top-4 right-4 px-3 py-1 text-sm font-medium text-white/80 glass rounded-xl">
              {category}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-5">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-2">{name}</h1>
              <p className="text-lg text-primary-400 font-semibold">{tagline}</p>
            </div>

            <p className="text-gray-400 leading-relaxed">{longDescription}</p>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white font-bold">{rating}</span>
              <span className="text-gray-500 text-sm">({reviewCount.toLocaleString()} reviews)</span>
            </div>

            {/* Pricing card */}
            <div className="glass rounded-2xl p-5 border border-white/10">
              <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-black text-white">${price}</span>
                <span className="text-gray-400 text-sm pb-1">/month</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Or <span className="text-accent-400 font-semibold">${priceYearly}/year</span> — save {Math.round(((price * 12 - priceYearly) / (price * 12)) * 100)}%
              </p>
              <button onClick={handleSubscribe} className="w-full btn-primary py-4 text-base">
                {user ? 'Subscribe Now' : 'Get Started — Sign In'}
              </button>
              <p className="text-xs text-gray-600 text-center mt-3">14-day free trial · Cancel anytime</p>
            </div>
          </div>
        </div>

        {/* ── Features ── */}
        <div className="glass rounded-3xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Product snapshots ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm text-primary-400 uppercase tracking-[0.24em] mb-2">Product Screenshots</p>
              <h2 className="text-3xl font-bold text-white">Visualise the platform in action</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {product.screenshots?.map((screenshot) => (
              <motion.div key={screenshot.title}
                whileHover={{ y: -6 }}
                className="glass rounded-3xl p-6 border border-white/10 shadow-xl shadow-black/10 transition-all duration-300">
                <div className="h-44 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.28),_transparent_35%)]" />
                  <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-cyan-400/15 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-sm font-semibold text-white/90">{screenshot.title}</div>
                </div>
                <div className="mt-5">
                  <p className="text-sm text-gray-300 leading-relaxed">{screenshot.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Reviews ── */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map(({ user: reviewer, avatar, rating: r, comment, date }) => (
              <div key={reviewer} className="glass glass-hover rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{reviewer}</p>
                    <p className="text-xs text-gray-500">{date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-3.5 h-3.5 ${i < r ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">"{comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Related products ── */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="glass glass-hover rounded-2xl p-4 flex gap-4 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white group-hover:gradient-text transition-all">{p.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{p.tagline}</p>
                  <p className="text-xs text-primary-400 font-semibold mt-1">${p.price}/mo</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
