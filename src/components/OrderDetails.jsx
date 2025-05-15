import React from "react";
import { MapPin, Phone, Mail, CreditCard, Truck } from "lucide-react";

const OrderDetails = ({ order }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-5 border-t border-b border-gray-100">
      {/* Contact Information */}
      <div className="flex flex-col">
        <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
          <Phone className="h-4 w-4 mr-2 text-gray-400" />
          Contact Information
        </h4>
        <div className="flex flex-col space-y-2 text-sm">
          <p className="font-medium text-gray-900">Mike Johnatan</p>
          <p className="text-gray-700 flex items-center">
            <Phone className="h-3.5 w-3.5 mr-2 text-gray-400" />
            +201231500789
          </p>
          <p className="text-gray-700 flex items-center">
            <Mail className="h-3.5 w-3.5 mr-2 text-gray-400" />
            info@mail.com
          </p>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="flex flex-col">
        <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
          Shipping Address
        </h4>
        <div className="flex flex-col text-sm">
          <p className="text-gray-700 leading-relaxed">{order.address}</p>
        </div>
      </div>

      {/* Payment Information */}
      <div className="flex flex-col">
        <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
          <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
          Payment Details
        </h4>
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">
              {order.items.reduce(
                (total, item) => total + Number(item.product.price),
                0
              )}{" "}
              EGP
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center">
              <Truck className="h-3.5 w-3.5 mr-1 text-gray-400" />
              Shipping Fee:
            </span>
            <span className="font-medium">{order.shippingFee} EGP</span>
          </div>
          <div className="h-px bg-gray-100 my-1"></div>
          <div className="flex justify-between items-center font-medium">
            <span className="text-gray-800">Total:</span>
            <span className="text-gray-900">
              {order.items.reduce(
                (total, item) => total + Number(item.product.price),
                0
              ) + Number(order.shippingFee)}{" "}
              EGP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
