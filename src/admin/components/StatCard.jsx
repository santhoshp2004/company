export default function StatCard({ title, value, delta, icon, color = 'from-indigo-500 to-cyan-500' }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10 transition hover:-translate-y-1">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">{title}</p>
          <p className="mt-3 text-3xl font-black text-white">{value}</p>
        </div>
        <div className={`rounded-3xl bg-gradient-to-br ${color} p-4 text-white text-xl`}>
          {icon}
        </div>
      </div>
      {delta ? <p className="mt-4 text-sm text-green-400">{delta}</p> : null}
    </div>
  );
}
