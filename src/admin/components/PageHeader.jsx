/** Reusable admin page top bar with title + optional CTA button */
export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-black text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', boxShadow: '0 4px 12px rgba(22,163,74,0.3)' }}
        >
          {action.icon && <span>{action.icon}</span>}
          {action.label}
        </button>
      )}
    </div>
  );
}
