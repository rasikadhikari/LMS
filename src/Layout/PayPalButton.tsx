import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalCheckoutProps {
  price: number;
  onSuccess: (details: any) => void;
}

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({
  price,
  onSuccess,
}) => {
  const [clientID, setClientID] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/config/paypal")
      .then((res) => res.json())
      .then((data) => {
        setClientID(data.clientId);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching PayPal Client ID:", err);
        setLoading(false);
      });
  }, []);

  const createOrder = async () => {
    return fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => data.orderID);
  };

  const onApprove = async (data: { orderID: string }) => {
    return fetch(`http://localhost:5000/api/orders/${data.orderID}/capture`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((details) => onSuccess(details));
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AbwcO1StVgUoZhXYB4CV1af6EktTsujL8Y_V6-L6u3NtPsTldsXG9uFAzDbYkYkkb90Y8EUJ2SM4CpAk",
        currency: "USD",
      }}
    >
      {loading ? (
        <div className="py-4 text-black">Initializing PayPal...</div>
      ) : (
        clientID && (
          <PayPalButtons
            style={{
              layout: "vertical",
              color: "gold",
              height: 45,
              label: "checkout",
            }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={(err) => console.error("PayPal error:", err)}
          />
        )
      )}
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
