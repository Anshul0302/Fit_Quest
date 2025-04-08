import { useState } from "react";
import { MoreVertical, Eye, Pencil, Trash } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const ActionMenu = ({ data, onView, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-8 w-32 bg-white rounded-lg shadow border border-gray-200 z-50">
          <ul className="text-sm divide-y">
            <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2" onClick={()=>{onView(data)}}>
              <Eye size={16} /> View
            </li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2" onClick={()=>{}}>
              <Pencil size={16} /> Edit
            </li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2" onClick={()=>{}}>
              <Trash size={16} /> Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
