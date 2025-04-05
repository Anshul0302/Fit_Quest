// components/ChallengeManagement/ChallengeModal.js
import { useState } from "react";
import { X } from "lucide-react";

export const FilterModal = ({ isOpen, onClose, onApply, onReset }) => {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30  z-50 flex justify-center items-center ">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full  max-w-sm relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filter</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded px-4 py-2"
            placeholder="Select Date"
          />
          <div className="flex gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-1/2 border rounded px-3 py-2"
            >
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-1/2 border rounded px-3 py-2"
            >
              <option value="">Type</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="educational">Educational</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => {
              setDate("");
              setStatus("");
              setType("");
              onReset && onReset();
            }}
            className="px-4 py-2 border rounded text-gray-700"
          >
            Reset all
          </button>
          <button
            onClick={() => onApply({ date, status, type })}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

// View
export const ViewModal = ({ isOpen, onClose, challenge }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Challenge Info</h2>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Title:</strong> {challenge.title}
          </p>
          <p>
            <strong>Type:</strong> {challenge.type}
          </p>
          <p>
            <strong>Status:</strong> {challenge.status}
          </p>
          <p>
            <strong>Start Date:</strong> {challenge.startDate}
          </p>
        </div>
      </div>
    </div>
  );
};

// Edit
export const EditModal = ({ isOpen, onClose, challenge, onSave }) => {
  const [form, setForm] = useState(challenge);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Challenge</h2>
        <div className="mb-3">
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm mb-1">Type</label>
          <input
            type="text"
            value={form.type}
            onChange={(e) => updateField("type", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm mb-1">Status</label>
          <select
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option>Upcoming</option>
            <option>Running</option>
            <option>Completed</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              onSave(form);
              onClose();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete
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
