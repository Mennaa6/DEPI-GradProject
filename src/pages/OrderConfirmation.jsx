import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("orderDetails"));
    if (!storedOrder) {
      navigate("/"); 
    } else {
      setOrderDetails(storedOrder);
    }
  }, [navigate]);

  if (!orderDetails) return null;

  const { shippingDetails, paymentDetails, cartItems } = orderDetails;
  const deliveryFee = shippingDetails.governorate === "Mansoura" ? 80 : 50;

  const total =
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
    deliveryFee;

  return (
    <div className="bg-[#E4E0E1] min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#493628] mb-8">
          <FaCheckCircle className="inline mr-2 text-green-500" />
          🎉 Order Confirmed!
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
          <p>
            <strong>Name:</strong> {shippingDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {shippingDetails.email}
          </p>
          <p>
            <strong>Address:</strong> {shippingDetails.address}
          </p>
          <p>
            <strong>City:</strong> {shippingDetails.city}
          </p>
          <p>
            <strong>Governorate:</strong> {shippingDetails.governorate}
          </p>
          <p>
            <strong>ZIP:</strong> {shippingDetails.zip}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Payment Info</h2>
          <p>
            <strong>Card Number:</strong> {paymentDetails.cardNumber}
          </p>
          <p>
            <strong>Expiration Date:</strong> {paymentDetails.expDate}
          </p>
          <p>
            <strong>CVV:</strong> ***
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-2">
              <span>{item.title}</span>
              <span>Qty: {item.quantity}</span>
              <span>{(item.quantity * item.price).toFixed(2)} EGP</span>
            </div>
          ))}
          <hr className="my-3" />
          <div className="flex justify-between font-semibold">
            <p>Delivery:</p>
            <p>{deliveryFee.toFixed(2)} EGP</p>
          </div>
          <div className="flex justify-between font-bold mt-2 text-lg">
            <p>Total:</p>
            <p>{total.toFixed(2)} EGP</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Link to="/">
            <button className="bg-[#493628] text-white px-4 py-2 rounded-lg hover:bg-[#AB886D]">
              Go to Home
            </button>
          </Link>
          <Link to="/products">
            <button className="bg-[#493628] text-white px-4 py-2 rounded-lg hover:bg-[#AB886D]">
              View Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
