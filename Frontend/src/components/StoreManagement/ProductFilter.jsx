// components/ProductFilterModal.jsx
import { X } from "lucide-react";

function ProductFilterModal({ onClose, onApply }) {
  return (
    <div className="fixed inset-0 z-50  bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={18} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Filter Products</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option>All</option>
              <option>PHARMACEUTICALS</option>
              <option>SUPPLEMENTS</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">Inventory</label>
            <input type="number" className="w-full border rounded px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Reset
          </button>
          <button
            onClick={() => {
              onApply();
              onClose();
            }}
            className="px-4 py-2 rounded bg-blue-500 text-white text-sm"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductFilterModal;
