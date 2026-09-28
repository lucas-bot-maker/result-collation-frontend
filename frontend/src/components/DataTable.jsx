import { getPath } from "../config/resourceConfig.js";

export const DataTable = ({ columns, rows, onEdit, onDelete, extraActions, rowKey = "id" }) => {
  if (!rows) {
    return (
      <div className="rounded-lg border border-line bg-paper-raised p-10 text-center text-slate text-sm">
        Loading records…
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line bg-paper-raised p-10 text-center">
        <p className="text-ink font-medium">Nothing here yet</p>
        <p className="text-sm text-slate mt-1">New records you add will appear in this table.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-paper-raised overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-paper text-left text-slate">
              {columns.map((col) => (
                <th key={col.label} className="px-4 py-3 font-medium">
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete || extraActions) && <th className="px-4 py-3 font-medium text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[rowKey]} className="border-b border-line last:border-0 hover:bg-paper transition-colors">
                {columns.map((col) => (
                  <td key={col.label} className="px-4 py-3 text-ink">
                    {col.render ? col.render(row) : (getPath(row, col.key) ?? "—")}
                  </td>
                ))}
                {(onEdit || onDelete || extraActions) && (
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      {extraActions && extraActions(row)}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="text-brass-dark hover:underline text-sm"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="text-rejected hover:underline text-sm"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
