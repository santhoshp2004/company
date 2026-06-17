import { Link } from 'react-router-dom';

/**
 * Product card component used in the Products marketplace page.
 * Displays product image, name, price, rating, and category badge.
 */
export default function ProductCard({ product, selected = false, onToggleCompare }) {
  const { id, name, tagline, description, image, price, rating, reviewCount, badge, badgeColor, category, features } = product;

  return (
    <div className="
      group glass glass-hover rounded-2xl overflow-hidden
      flex flex-col transition-all duration-500
      hover:shadow-2xl hover:shadow-primary-500/10
      hover:-translate-y-1
    ">
      {/* Product image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />

        {/* Compare toggle */}
        {onToggleCompare && (
          <button
            type="button"
            onClick={() => onToggleCompare(id)}
            className={`absolute top-3 right-3 w-10 h-10 rounded-2xl border border-white/15 flex items-center justify-center text-sm font-semibold transition-all duration-300 ${selected ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
            aria-label={selected ? 'Remove from comparison' : 'Add to comparison'}
          >
            {selected ? '✓' : '+'}
          </button>
        )}

        {/* Badge */}
        {badge && (
          <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${badgeColor} shadow-lg`}>
            {badge}
          </div>
        )}

        {/* Category chip */}
        <div className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium text-white/80 glass rounded-lg">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Name & tagline */}
        <div>
          <h3 className="text-lg font-bold text-white group-hover:gradient-text transition-all duration-300">
            {name}
          </h3>
          <p className="text-xs text-primary-400 font-medium mt-0.5">{tagline}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        {/* Top features */}
        <ul className="space-y-1">
          {features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5 text-accent-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-400">
            <span className="text-white font-medium">{rating}</span> ({reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div>
            <span className="text-2xl font-bold text-white">${price}</span>
            <span className="text-xs text-gray-500">/mo</span>
          </div>
          <Link
            to={`/products/${id}`}
            className="
              px-4 py-2 text-sm font-semibold text-white rounded-xl
              bg-gradient-to-r from-primary-600 to-purple-600
              hover:from-primary-500 hover:to-purple-500
              transition-all duration-300 shadow-lg shadow-primary-900/40
              hover:shadow-primary-500/30 hover:-translate-y-0.5
            "
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
