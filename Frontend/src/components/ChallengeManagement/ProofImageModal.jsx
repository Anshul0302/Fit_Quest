// components/ProofImageModal.jsx
import React from "react";
import { X } from "lucide-react";

const sampleImages = [
  "/proof img.png",
  "/proof img.png",
  "/proof img.png",
  "/proof img.png",
  "/proof img.png",
  "/proof img.png",
];

const ProofImageModal = ({ isOpen, onClose, onAccept, onReject }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Proof Images</h2>

        <div className="grid grid-cols-3 gap-3">
          {sampleImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Proof ${i + 1}`}
              className="rounded-lg border h-24 object-cover"
            />
          ))}
        </div>

        <div className="mt-6 flex justify-between gap-4">
          <button
            className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={onReject}
          >
            Reject
          </button>
          <button
            className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={onAccept}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProofImageModal;
