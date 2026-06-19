import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Trash2, Search, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Generic CRUD data table.
 * Props:
 *   columns: [{ key, label }]
 *   rows:    any[]
 *   onEdit:  (row) => void
 *   onDelete:(row) => void
 *   searchKeys: string[]   — which fields to match search against
 */
export default function CrudTable({ columns, rows, onEdit, onDelete, onView, searchKeys = [] }) {
  const [q, setQ] = useState('');

  const filtered = q.trim()
    ? rows.filter(r =>
        searchKeys.some(k =>
          String(r[k] ?? '').toLowerCase().includes(q.toLowerCase())
        )
      )
    : rows;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      {/* Search bar */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
          <Search size={14} className="text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search…"
            className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none flex-1"
          />
          {q && <button onClick={() => setQ('')}><X size={13} className="text-slate-400 hover:text-slate-600" /></button>}
        </div>
        <span className="text-xs text-slate-400 whitespace-nowrap">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {columns.map(col => (
                <th key={col.key} className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  {col.label}
                </th>
              ))}
              <th className="px-5 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-5 py-10 text-center text-sm text-slate-400">
                    No records found
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <motion.tr
                    key={row.id || i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.22 }}
                    className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors group"
                  >
                    {columns.map(col => (
                      <td key={col.key} className="px-5 py-3.5 text-slate-700 max-w-[200px]">
                        <span className="line-clamp-1 block">{col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}</span>
                      </td>
                    ))}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onView && (
                          <button
                            onClick={() => onView(row)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 transition-colors"
                          >
                            <Search size={12} /> View
                          </button>
                        )}
                        <button
                          onClick={() => onEdit(row)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                        >
                          <Pencil size={12} /> Edit
                        </button>
                        <button
                          onClick={() => onDelete(row)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
