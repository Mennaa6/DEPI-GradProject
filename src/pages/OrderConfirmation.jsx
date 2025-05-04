import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F6F2] px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 mb-6">
          Your order has been successfully placed. We'll send you an update when
          it ships.
        </p>

        {/* Example Order Details (can be dynamic if needed) */}
        <div className="bg-gray-100 rounded-md p-4 text-left text-sm text-gray-700 mb-6">
          <p>
            <span className="font-semibold">Order Number:</span> #123456789
          </p>
          <p>
            <span className="font-semibold">Estimated Delivery:</span> 3–5
            business days
          </p>
          <p>
            <span className="font-semibold">Total Paid:</span> 850.00 EGP
          </p>
        </div>

        <button
          onClick={handleGoHome}
          className="bg-[#493628] text-white px-6 py-2 rounded-md hover:bg-[#AB886D] transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
