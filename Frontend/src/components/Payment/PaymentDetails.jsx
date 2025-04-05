import { useParams } from "react-router-dom";

function PaymentDetails() {
  const { id } = useParams();

  const payment = {
    id,
    user: "John Doe",
    email: "john@example.com",
    orderId: "ORDER1245",
    transactionId: "TXN34567890",
    method: "PayPal",
    type: "Subscription",
    price: "$4,200",
    date: "Mar 31, 2025",
    status: "Success",
    avatar: "/avatar.png",
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow my-3">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Payment Details</h1>
        <button className="text-blue-500 border border-blue-500 px-4 py-1 rounded text-sm">
          Download Invoice
        </button>
      </div>

      <div className="border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4 items-center">
            <img src={payment.avatar} alt={payment.user} className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="text-base font-semibold">{payment.user}</h2>
              <p className="text-sm text-gray-500">{payment.email}</p>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">
            {payment.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p>
            <strong>Order ID:</strong> {payment.orderId}
          </p>
          <p>
            <strong>Transaction ID:</strong> {payment.transactionId}
          </p>
          <p>
            <strong>Method:</strong> {payment.method}
          </p>
          <p>
            <strong>Type:</strong> {payment.type}
          </p>
          <p>
            <strong>Total Paid:</strong> {payment.price}
          </p>
          <p>
            <strong>Date:</strong> {payment.date}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
