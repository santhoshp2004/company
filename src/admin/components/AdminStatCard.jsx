import { motion } from 'framer-motion';

export default function AdminStatCard({ icon, label, value, color = '#16a34a', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: color + '18' }}>
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-black text-slate-900 mt-0.5">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
