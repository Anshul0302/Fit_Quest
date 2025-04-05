import { useParams } from "react-router-dom";
import { useState } from "react";

const OrderDetails = () => {
  const { id } = useParams();

  const order = {
    id,
    user: {
      name: "John Doe",
      phone: "+1234567890",
      email: "john@example.cm",
    },
    orderId: `#ORD1234${id}`,
    date: "Mar 31, 2025",
    shipping: {
      country: "United States",
      state: "New York",
      city: "New York City",
      zip: "10001",
      address: "123 Main Street, Apartment 4B",
    },
    product: {
      name: "Nandrolone Phenylpropionate",
      category: "Pharmaceuticals",
      qty: 2,
      price: "$4,999",
      image: "https://steroidelite.com/wp-content/uploads/2024/07/Artboard-7-100-600x600.jpg",
    },
    payment: {
      method: "Stripe",
      coinsUsed: 999,
      total: "$4,000",
      transactionId: "TX12345678",
    },
    trackingNumber: "TRK987654321",
    status: "Shipped",
  };

  const [status, setStatus] = useState(order.status);

  const statusSteps = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const getStepClass = (step) => {
    const currentIndex = statusSteps.indexOf(status);
    const stepIndex = statusSteps.indexOf(step);
    if (stepIndex < currentIndex) return "text-green-500";
    if (stepIndex === currentIndex) return "text-green-600 font-semibold";
    return "text-gray-400";
  };

  const infoItem = (label, value) => (
    <div className="mb-2">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Order Details:</h2>
        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-1.5 rounded text-sm"
          >
            {statusSteps.map((step) => (
              <option key={step} value={step}>
                {step}
              </option>
            ))}
          </select>
          <button className="border border-blue-500 text-blue-500 px-3 py-1.5 rounded hover:bg-blue-50 text-sm">
            Download Invoice
          </button>
        </div>
      </div>

      {/* Product */}
      <div className="flex items-center gap-4 border-b pb-4 mb-6">
        <img
          src={order.product.image}
          alt="product"
          className="w-20 h-20 rounded-md object-cover"
        />
        <div>
          <h3 className="text-lg font-medium">{order.product.name}</h3>
          <p className="text-xs text-gray-500 uppercase">
            {order.product.category}
          </p>
        </div>
      </div>

      {/* Information Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {/* User Info */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">User Information</h4>
          <div className="grid grid-cols-2 gap-3">
            {infoItem("Name", order.user.name)}
            {infoItem("Phone Number", order.user.phone)}
            {infoItem("Email", order.user.email)}
            {infoItem("Order ID", order.orderId)}
            {infoItem("Order Date", order.date)}
          </div>
        </div>

        {/* Shipping Info */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Shipping Information</h4>
          <div className="grid grid-cols-2 gap-3">
            {infoItem("Country", order.shipping.country)}
            {infoItem("State", order.shipping.state)}
            {infoItem("City", order.shipping.city)}
            {infoItem("Zip Code", order.shipping.zip)}
            {infoItem("Address", order.shipping.address)}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Product Information</h4>
          <div className="grid grid-cols-2 gap-3">
            {infoItem("Product", order.product.name)}
            {infoItem("Qty", order.product.qty)}
            {infoItem("Price", order.product.price)}
          </div>
        </div>

        {/* Payment Info */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Payment Information</h4>
          <div className="grid grid-cols-2 gap-3">
            {infoItem("Total Amount Paid", order.payment.total)}
            {infoItem("Coins Used", order.payment.coinsUsed)}
            {infoItem("Payment Method", order.payment.method)}
            {infoItem("Transaction ID", order.payment.transactionId)}
          </div>
        </div>

        {/* Tracking Info */}
        <div className="md:col-span-2">
          <h4 className="font-semibold text-gray-700 mb-2">Tracking Information</h4>
          {infoItem("Tracking Number", order.trackingNumber)}
        </div>
      </div>

      {/* Status Tracker */}
      <div className="flex items-center justify-between mt-10 border-t pt-6">
        {statusSteps.map((step, index) => (
          <div
            key={step}
            className="flex flex-col items-center text-center w-full relative"
          >
            <div
              className={`w-8 h-8 mb-1 rounded-full border-2 flex items-center justify-center ${
                getStepClass(step).includes("green")
                  ? "border-green-500 bg-green-100"
                  : "border-gray-300 bg-white"
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-xs ${getStepClass(step)}`}>{step}</span>
            {index < statusSteps.length - 1 && (
              <div className="absolute top-4 right-0 w-full border-t border-dashed border-gray-300 z-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
