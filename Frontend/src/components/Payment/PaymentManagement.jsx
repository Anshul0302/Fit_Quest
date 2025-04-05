import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import {FilterModal} from "../ChallengeManagement/ChallengeModal";

const paymentsData = [
  {
    id: 1,
    user: "John Doe",
    email: "john@example.com",
    avatar: "/avatar.png",
    orderId: "ORDER1234",
    transactionId: "TXN1234",
    method: "PayPal",
    type: "Subscription",
    price: "$4,200",
    date: "Mar 30, 2025",
    status: "Success",
  },
  {
    id: 2,
    user: "Jane Smith",
    email: "jane@example.com",
    avatar: "/avatar.png",
    orderId: "ORDER4567",
    transactionId: "TXN7890",
    method: "Stripe",
    type: "Store",
    price: "$3,800",
    date: "Mar 29, 2025",
    status: "Success",
  },
];

function PaymentManagement() {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-6xl mx-auto relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Payment Management</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg text-sm bg-gray-50"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className="border px-3 py-2 rounded-md flex items-center gap-2 text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Payment Method</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentsData.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{p.user}</td>
                <td className="px-4 py-3">{p.orderId}</td>
                <td className="px-4 py-3">{p.price}</td>
                <td className="px-4 py-3">{p.date}</td>
                <td className="px-4 py-3">{p.method}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() =>
                      navigate(`/payments/${p.id}`, { state: { payment: p } })
                    }
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={() => setShowFilter(false)}
      />
    </div>
  );
}

export default PaymentManagement;
