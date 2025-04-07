function DeleteSubscriptionModal({ plan, onClose, onConfirm }) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-xl text-center">
          <h2 className="text-lg font-semibold mb-2">Delete Subscription Plan?</h2>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-500">{plan.name}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(plan.id)}
              className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default DeleteSubscriptionModal;
  