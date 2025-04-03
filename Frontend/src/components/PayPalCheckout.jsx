// components/PayPalCheckout.jsx
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckout = () => {
  return (
    <PayPalScriptProvider options={{ clientId: "YOUR_PAYPAL_CLIENT_ID" }}>
      <div className="max-w-md mx-auto p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Pay with PayPal</h2>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return fetch("http://localhost:8000/api/payment/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount: "10.00" }),
            })
              .then((res) => res.json())
              .then((data) => data.id);
          }}
          onApprove={(data, actions) => {
            return fetch("http://localhost:8000/api/payment/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderID: data.orderID }),
            })
              .then((res) => res.json())
              .then((details) => {
                alert(
                  "✅ Payment completed by " + details.payer.name.given_name
                );
                console.log("🎉 Payment details:", details);
              });
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
