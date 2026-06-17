export default function DataTable({ title, columns, rows, action }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10 overflow-x-auto">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {action}
      </div>
      <table className="min-w-full text-left text-sm text-gray-200">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-[0.25em] text-gray-400">
            {columns.map((col) => (
              <th key={col.key} className="px-3 py-3">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-white/5 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-3 py-4 align-top">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
