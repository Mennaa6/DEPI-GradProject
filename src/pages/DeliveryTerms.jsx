import React from "react";
import {
  FaTruck,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaClock,
  FaHeadset,
} from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const DeliveryTerms = () => {
    const navigate = useNavigate();
    const backTocart = () => {
        navigate('/cart');
    }
  return (
    <div className="bg-[#D6C0B3] flex items-center justify-center p-6 shadow-xl">
      <div className="shadow-xl bg-white w-auto p-10 rounded-2xl">
        <h1 className="text-black text-lg md:text-3xl text-center font-bold mb-6">
          Delivery Terms and Conditions
        </h1>

        <div className="flex flex-col items-start gap-4 mb-8">
          <FaTruck className="text-[#493628] text-xl md:text-3xl" />
          <div>
            <h2 className=" text-lg md:text-2xl font-semibold mb-2 ">Delivery Timeline</h2>
            <p className="text-gray-700">
              Once your order is confirmed, it will be processed within 24
              hours. Standard delivery within Cairo, Giza, and Alexandria
              typically takes 3–5 business days. Remote areas may require an
              additional 2 days.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 mb-8">
          <FaMoneyBillWave className="text-[#493628] text-xl md:text-3xl" />
          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-2">Shipping Fees</h2>
            <p className="text-gray-700">
              A standard shipping fee of <span className="font-bold">50 EGP</span> will be applied to all
              orders. Free shipping is available for orders exceeding{" "}
              <span className="font-bold">1,000 EGP</span>.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 mb-8">
          <FaMapMarkerAlt className="text-[#493628] text-xl md:text-3xl" />
          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-2">Delivery Locations</h2>
            <p className="text-gray-700">
              Currently, we deliver across major cities including Cairo, Giza,
              and Alexandria. Deliveries outside these areas may be arranged
              with additional charges. Please contact customer service for more
              information.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 mb-8">
          <FaClock className="text-[#493628] text-xl md:text-3xl" />
          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-2">Order Processing</h2>
            <p className="text-gray-700">
              Orders placed before 3 PM are processed the same day. Orders
              placed after 3 PM, during weekends, or holidays will be processed
              the next business day.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 mb-8">
          <FaHeadset className="text-[#493628] text-xl md:text-3xl" />
          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-2">Customer Support</h2>
            <p className="text-gray-700">
              If you have any questions about your order or delivery status,
              please reach out to our customer support team at{" "}
              <a
                href="mailto:support@gmail.com"
                className="text-blue-600 underline"
              >
                support@gmail.com
              </a>
              . We are available 7 days a week, from 9 AM to 6 PM.
            </p>
          </div>
              </div>
            <div className="mt-6 text-center">
          <Button className="bg-[#493628] text-white font-semibold rounded-md hover:bg-[#AB886D] " onClick={()=>backTocart()}>
          View Your Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTerms;