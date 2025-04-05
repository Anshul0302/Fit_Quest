import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { DeleteConfirmModal } from "./ChallengeModal";

const ChallengeActionMenu = ({ data, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();
  

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-8 w-32 bg-white rounded-lg shadow border z-50">
          <ul className="text-sm divide-y">
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate(`/admin/challenges/view/${data._id}`);
              }}
            >
              👁️ View
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate(`/admin/challenges/edit/${data._id}`);
              }}
            >
              ✏️ Edit
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setShowDelete(true);
                setOpen(false);
              }}
            >
              🗑️ Delete
            </li>
          </ul>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        challengeId={data.id}
        onConfirm={onDelete}
      />
    </div>
  );
};

export default ChallengeActionMenu;
