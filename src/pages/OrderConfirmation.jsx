import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-tailwind/react";

const OrderConfirmation = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    if (orderId && userId) {
      axios
        .get(
          `https://depis3.vercel.app/api/orders/${userId}/${orderId}`
        )
        .then((response) => {
          setOrderDetails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch order details:", error);
          setLoading(false);
        });
    }
  }, [orderId]);

  if (loading) {
    return <div className="text-center mt-20 text-xl font-bold">Loading order details...</div>;
  }

  // if (!orderDetails) {
  //   return <div className="text-center mt-20 text-xl font-bold">Order not found.</div>;
  // }

  return (
    <div className="bg-[#F4EFE9] min-h-screen py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#493628] mb-8">Order Confirmation</h1>

        <p className="text-center text-lg mb-6">
          🎉 Thank you for your order! Your order ID is{" "}
          <span className="font-bold">{orderDetails._id}</span>
        </p>

        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <p className="mb-4">{orderDetails.address}</p>

        <h2 className="text-xl font-semibold mb-4">Items Ordered</h2>
        <ul className="space-y-2 mb-6">
          {orderDetails.items.map((item, index) => (
            <li key={index} className="border-b pb-2">
              📦 Product ID: {item}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-4">Total Paid</h2>
        <p>💰 Not specified in order, please include total in backend if needed.</p>

        <div className="text-center mt-8">
          <Link to="/">
            <Button className="bg-[#493628] hover:bg-[#AB886D] text-white px-6 py-2 rounded-lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
