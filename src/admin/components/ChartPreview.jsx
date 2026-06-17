export default function ChartPreview({ title, data, color = 'from-blue-500 to-cyan-500' }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-gray-400">{title}</p>
        </div>
        <div className="text-xs text-gray-400">Trending</div>
      </div>
      <div className="h-48 overflow-hidden rounded-3xl bg-white/5 p-3">
        <div className="relative h-full w-full">
          <div className={`absolute inset-x-0 bottom-0 h-2 rounded-full bg-gradient-to-r ${color}`} />
          <svg viewBox="0 0 220 110" className="h-full w-full">
            <polyline
              fill="none"
              stroke="rgba(56,189,248,0.85)"
              strokeWidth="3"
              points={data.map((point, index) => `${index * (220 / (data.length - 1))},${110 - point}`).join(' ')}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
