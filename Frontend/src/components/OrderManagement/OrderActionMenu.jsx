import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { EditModal, DeleteConfirmModal } from "../OrderManagement/OrderModal";

const OrderActionMenu = ({ data, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
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
                navigate(`/orders/${data.id}`); // 👉 Navigate to order detail page
                setOpen(false);
              }}
            >
              👁️ View
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setShowEdit(true);
                setOpen(false);
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

      {/* Only edit & delete modals stay */}
      <EditModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        order={data}
        onSave={onEdit}
      />
      <DeleteConfirmModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        orderId={data.id}
        onConfirm={onDelete}
      />
    </div>
  );
};

export default OrderActionMenu;
