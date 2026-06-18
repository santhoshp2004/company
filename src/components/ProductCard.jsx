import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * Reusable product card used inside MegaMenu.
 * Props: icon (ReactNode), name, desc, badge, badgeColor, to
 */
export default function ProductCard({ icon: Icon, name, desc, badge, badgeVariant = 'public', to = '/products', onClick }) {
  const badgeStyles = {
    public:   { bg: '#DBEAFE', text: '#1D4ED8' },
    business: { bg: '#FEF3C7', text: '#B45309' },
    base:     { bg: '#D1FAE5', text: '#065F46' },
  };
  const bs = badgeStyles[badgeVariant] || badgeStyles.public;

  return (
    <Link
      to={to}
      onClick={onClick}
      className="group flex items-start gap-3 p-3 rounded-2xl transition-all duration-200 hover:bg-blue-50 hover:-translate-y-0.5"
    >
      {/* Icon circle */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200">
        {Icon && <Icon size={18} className="text-blue-600" />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{name}</span>
          {badge && (
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wider uppercase"
              style={{ backgroundColor: bs.bg, color: bs.text }}
            >
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{desc}</p>
      </div>

      <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-400 flex-shrink-0 mt-1 transition-colors" />
    </Link>
  );
}
