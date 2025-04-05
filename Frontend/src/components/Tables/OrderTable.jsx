import { useState } from "react";
import { Link } from "react-router-dom";
import ReusableTable from "../UI/ReusableTable";
import OrderActionMenu from "../OrderManagement/OrderActionMenu";
import { FilterModal } from "../ChallengeManagement/ChallengeModal";
// import { Input } from "@/components/ui/input";

const initialOrders = Array(5)
  .fill()
  .map((_, i) => ({
    id: i + 1,
    user: "John Doe",
    avatar: "https://i.pravatar.cc/40?img=" + (i + 1),
    orderId: "#ORD12345" + i,
    amount: "$4,999",
    date: "2025-03-31",
    status: ["Delivered", "Processing", "Shipped", "Out for Delivery", "New"][
      i % 5
    ],
  }));

const OrderTable = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const applyFilters = ({ date, status }) => {
    setDate(date);
    setStatus(status);
    setShowFilterModal(false);
  };

  const resetFilters = () => {
    setDate("");
    setStatus("");
  };

  const handleUpdate = (updatedOrder) => {
    setOrders(
      orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.user
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = status ? order.status === status : true;
    const matchesDate = date ? order.date === date : true;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const columns = [
    {
      header: "User Name",
      render: (order) => (
        <div className="flex items-center gap-2">
          <img
            src={order.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <Link
            to={`/orders/${order.id}`}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {order.user}
          </Link>
        </div>
      ),
    },
    { header: "Order ID", accessor: "orderId" },
    { header: "Total Amount", accessor: "amount" },
    { header: "Order Date", accessor: "date" },
    {
      header: "Status",
      render: (order) => (
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
          {order.status}
        </span>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center m-4 gap-4">
        <h2 className="text-xl font-semibold">Order Management</h2>

        {/* Right side: Filter + Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowFilterModal(true)}
            className="border border-gray-500 text-blue-500 bg-white px-4 py-2 rounded-lg text-sm hover:bg-blue-50"
          >
            Filter
          </button>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user name..."
            className="border px-3 py-2 rounded w-full sm:w-64 bg-white"
          />
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={applyFilters}
        onReset={resetFilters}
      />

      {/* Table */}
      <ReusableTable
        title=""
        columns={columns}
        data={filteredOrders}
        renderActions={(order) => (
          <OrderActionMenu
            data={order}
            onEdit={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      />
    </div>
  );
};

export default OrderTable;
