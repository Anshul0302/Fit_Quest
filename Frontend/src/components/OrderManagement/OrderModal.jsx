import ReusableDetailsView from "../UI/ReusableDetailsView";
import { useState } from "react";

// 🔍 View Modal
export const ViewModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  const orderInfo = [
    { label: "Order ID", value: order.orderId },
    { label: "Total Amount", value: order.amount },
    { label: "Order Date", value: order.date },
    { label: "Status", value: order.status },   
  ];

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
      <div className="relative w-full max-w-4xl">
        <div className="absolute top-4 right-4">
          <button
            className="text-gray-600 bg-white p-2 rounded-full shadow"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <ReusableDetailsView
          title="Order Details"
          avatar={order.avatar}
          name={order.user}
          email={`User ID: ${order.id}`}
          info={orderInfo}
        />
      </div>
    </div>
  );
};

// ✏️ Edit Modal
export const EditModal = ({ isOpen, onClose, order, onSave }) => {
  const [form, setForm] = useState(order);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const statusOptions = [
    "New",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Order</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Order ID</label>
          <input
            type="text"
            value={form.orderId}
            onChange={(e) => handleChange("orderId", e.target.value)}
            className="input"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="text"
            value={form.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            className="input"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="text"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="input"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="input"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="btn"
            onClick={() => {
              onSave(form);
              onClose();
            }}
          >
            Save
          </button>
          <button className="btn-outline" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// 🗑️ Delete Modal
export const DeleteConfirmModal = ({ isOpen, onClose, orderId, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete order <strong>{orderId}</strong>?
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              onConfirm(orderId);
              onClose();
            }}
          >
            Delete
          </button>
          <button className="border px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
