import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import SubscriptionFilterModal from "./SubscriptionFilterModal";

const dummySubscriptions = [
  {
    id: 1,
    user: "John Doe",
    email: "john@example.com",
    plan: "Premium",
    price: "$49.99",
    status: "Active",
    startDate: "2025-03-01",
    endDate: "2025-06-01",
    paymentMethod: "Stripe",
  },
  {
    id: 2,
    user: "Jane Smith",
    email: "jane@example.com",
    plan: "Basic",
    price: "$19.99",
    status: "Expired",
    startDate: "2024-12-01",
    endDate: "2025-03-01",
    paymentMethod: "PayPal",
  },
];

function SubscriptionManagement() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState(dummySubscriptions);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Subscription Management</h1>
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

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Plan</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Start</th>
              <th className="px-4 py-2">End</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium">{sub.user}</p>
                  <p className="text-xs text-gray-500">{sub.email}</p>
                </td>
                <td className="px-4 py-3">{sub.plan}</td>
                <td className="px-4 py-3">{sub.price}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      sub.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {sub.status}
                  </span>
                </td>
                <td className="px-4 py-3">{sub.startDate}</td>
                <td className="px-4 py-3">{sub.endDate}</td>
                <td className="px-4 py-3">{sub.paymentMethod}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => navigate(`/subscriptions/view/${sub.id}`, { state: { subscription: sub } })}
                    className="text-blue-600 hover:underline text-sm mr-3"
                  >
                    View
                  </button>
                  <button className="text-red-500 hover:underline text-sm">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <SubscriptionFilterModal
          onClose={() => setShowFilter(false)}
          onApply={(filters) => {
            // TODO: Apply filters to subscriptions
            setShowFilter(false);
          }}
        />
      )}
    </div>
  );
}

export default SubscriptionManagement;
