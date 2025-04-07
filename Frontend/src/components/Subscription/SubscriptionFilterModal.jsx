import { X } from "lucide-react";

function SubscriptionFilterModal({ onClose, onApply }) {
  return (
    <div className="fixed inset-0 z-50  bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Filter Subscriptions</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">From Date</label>
            <input type="date" className="w-full border px-3 py-2 rounded text-sm" />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">To Date</label>
            <input type="date" className="w-full border px-3 py-2 rounded text-sm" />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Plan Type</label>
            <select className="w-full border px-3 py-2 rounded text-sm">
              <option value="">All</option>
              <option>Basic</option>
              <option>Premium</option>
              <option>Pro</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Status</label>
            <select className="w-full border px-3 py-2 rounded text-sm">
              <option value="">All</option>
              <option>Active</option>
              <option>Expired</option>
              <option>Canceled</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Reset
          </button>
          <button
            onClick={onApply}
            className="px-4 py-2 rounded bg-blue-500 text-white text-sm"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionFilterModal;
