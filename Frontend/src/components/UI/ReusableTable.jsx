import { useState } from "react";
import OrderFilterModal from "../OrderManagement/OrderFilterModal";

// components/ReusableTable.js
// components/UI/ReusableTable.js
const ReusableTable = ({ title, columns, data, renderActions }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-4 py-2">
                  {col.header}
                </th>
              ))}
              {renderActions && <th className="px-4 py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {columns.map((col, i) => (
                  <td key={i} className="px-4 py-3">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
                {renderActions && (
                  <td className="px-4 py-3">{renderActions(row)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReusableTable;
