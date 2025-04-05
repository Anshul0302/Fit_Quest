function PaymentFilter({ onClose }) {
    return (
      <div className="bg-white shadow rounded-xl p-4 mb-6 max-w-md">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">From Date</label>
            <input type="date" className="input" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">To Date</label>
            <input type="date" className="input" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Payment Method</label>
            <select className="input">
              <option value="">All</option>
              <option>PayPal</option>
              <option>Stripe</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Type</label>
            <select className="input">
              <option value="">All</option>
              <option>Subscription</option>
              <option>Store</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Reset All
          </button>
          <button className="px-4 py-2 rounded bg-blue-500 text-white text-sm">
            Apply Filter
          </button>
        </div>
      </div>
    );
  }
  
  export default PaymentFilter;
  