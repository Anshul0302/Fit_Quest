import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ExtendSubscriptionModal from "./ExtendSubscriptionModal";

function SubscriptionDetails() {
  const { id } = useParams();
  const { state } = useLocation();
  const subscription = state?.subscription;
  const [showExtendModal, setShowExtendModal] = useState(false);

  if (!subscription) {
    return (
      <div className="p-6 text-center text-sm">No subscription data found.</div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mt-5 mx-auto bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Subscription Details</h1>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            subscription.status === "Active"
              ? "bg-green-100 text-green-600"
              : subscription.status === "Expired"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {subscription.status}
        </span>
      </div>

      {/* User Info */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">User</h2>
        <div className="border rounded-lg p-4 text-sm">
          <p className="font-medium">{subscription?.user}</p>
          <p className="text-gray-500">{subscription?.email}</p>
        </div>
      </div>

      {/* Plan Info */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
          Subscription Plan
        </h2>
        <div className="border rounded-lg p-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p>
            <span className="text-gray-500 block text-xs">Plan</span>
            {subscription?.plan}
          </p>
          <p>
            <span className="text-gray-500 block text-xs">Price</span>
            {subscription?.price}
          </p>
          <p>
            <span className="text-gray-500 block text-xs">Start Date</span>
            {subscription?.startDate}
          </p>
          <p>
            <span className="text-gray-500 block text-xs">End Date</span>
            {subscription?.endDate}
          </p>
          <p>
            <span className="text-gray-500 block text-xs">Payment Method</span>
            {subscription?.paymentMethod}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button className="px-5 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">
          Cancel Subscription
        </button>
        <button
          onClick={() => setShowExtendModal(true)}
          className="px-5 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Extend Subscription
        </button>
      </div>
    </div>
  );
  {
    showExtendModal && (
      <ExtendSubscriptionModal
        subscription={subscription}
        onClose={() => setShowExtendModal(false)}
        onExtend={(id, newDate, note) => {
          console.log("Extend subscription:", { id, newDate, note });
          // TODO: API call here
          setShowExtendModal(false);
        }}
      />
    );
  }
}


export default SubscriptionDetails;
