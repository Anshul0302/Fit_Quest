import { useState } from "react";

const ReusableTable = ({ title, columns, data, onStatusToggle, renderActions }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic
  const filteredData = data.filter((row) =>
    columns.some((col) => {
      const value = col.accessor ? row[col.accessor] : "";
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="border-b text-gray-500">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="py-2 px-3">
                  {col.header}
                </th>
              ))}
              {renderActions && <th className="py-2 px-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-50">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-3 py-3">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
                {renderActions && (
                  <td className="px-3">
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-4 text-gray-500">
                  No matching results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReusableTable;

  