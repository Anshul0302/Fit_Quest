import { useState } from "react";

const OrderFilterModal = ({ isOpen, onClose, onApply }) => {
  const [filter, setFilter] = useState({
    date: "",
    status: "",
    payment: "",
  });

  const resetFilters = () => {
    setFilter({ date: "", status: "", payment: "" });
  };

  const applyFilters = () => {
    onApply(filter);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-black text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Filter Orders
        </h2>

        {/* Date Picker */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-600">
            Select Date
          </label>
          <input
            type="date"
            value={filter.date}
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Dropdown */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-600">
            Order Status
          </label>
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {/* Payment Method Dropdown */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-600">
            Payment Method
          </label>
          <select
            value={filter.payment}
            onChange={(e) => setFilter({ ...filter, payment: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="Stripe">Stripe</option>
            <option value="PayPal">PayPal</option>
            <option value="Coins">Coins</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={resetFilters}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            Reset All
          </button>
          <button
            onClick={applyFilters}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFilterModal;
