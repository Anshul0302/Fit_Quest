import { X } from "lucide-react";

function ExtendSubscriptionModal({ subscription, onClose, onExtend }) {
  const today = new Date().toISOString().split("T")[0];
  const defaultEndDate = subscription?.endDate || today;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Extend Subscription</h2>

        <div className="space-y-4 text-sm">
          <div>
            <label className="block mb-1 text-gray-600">User</label>
            <p className="font-medium">{subscription.user}</p>
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Current End Date</label>
            <p>{subscription.endDate}</p>
          </div>

          <div>
            <label className="block mb-1 text-gray-600">New End Date</label>
            <input
              type="date"
              defaultValue={defaultEndDate}
              min={today}
              className="w-full border px-3 py-2 rounded text-sm"
              id="newEndDate"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Note (Optional)</label>
            <textarea
              rows={3}
              className="w-full border px-3 py-2 rounded text-sm"
              placeholder="Reason for extension"
              id="note"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const newEndDate = document.getElementById("newEndDate").value;
              const note = document.getElementById("note").value;
              onExtend(subscription.id, newEndDate, note);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Confirm Extension
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExtendSubscriptionModal;
