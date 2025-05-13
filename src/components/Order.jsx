import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  Check,
  Truck,
  ShoppingBag,
  X,
} from "lucide-react";
import OrderProducts from "./OrderProducts";
import OrderDetails from "./OrderDetails";
import StatusTimeline from "./StatusTimeline";

const Order = ({ order, setOrders }) => {
  const [products, setProducts] = useState(order.items);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConfirmingCancel, setIsConfirmingCancel] = useState(false);

  function handleTotalPaid() {
    let totalPrice = 0;
    products.forEach((item) => {
      totalPrice += Number(item.price);
    });
    return totalPrice + Number(order.shippingFee);
  }

  function handleCancel() {
    if (!isConfirmingCancel) {
      setIsConfirmingCancel(true);
      return;
    }

    const userId = window.localStorage.getItem("id");
    if (userId) {
      fetch("https://depis3.vercel.app/api/orders", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          orderId: order._id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.orders);
          setIsConfirmingCancel(false);
        })
        .catch((error) => {
          console.error("Error cancelling order:", error);
          setIsConfirmingCancel(false);
        });
    }
  }

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "shipped":
        return "bg-green-50 text-green-600 border-green-200";
      case "delivered":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-4 sm:p-6">
        {/* Order Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  Order #{order._id.slice(-6)}
                </h3>
                <span
                  className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-1 sm:gap-4">
                <span className="flex items-center">
                  Placed: {formatDate(order.date)}
                </span>
                <span className="hidden sm:inline text-gray-300">|</span>
                <span className="text-xs sm:text-sm font-mono text-gray-400">
                  ID: {order._id}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {order.status !== "shipped" &&
              (isConfirmingCancel ? (
                <div className="flex items-center gap-2 animate-pulse">
                  <Button
                    variant="text"
                    size="sm"
                    className="text-gray-500 px-3 py-1.5 text-xs"
                    onClick={() => setIsConfirmingCancel(false)}
                  >
                    <X className="h-3.5 w-3.5 mr-1" /> Cancel
                  </Button>
                  <Button
                    variant="filled"
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 px-3 py-1.5 text-xs"
                    onClick={handleCancel}
                  >
                    Confirm
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outlined"
                  size="sm"
                  className="border-red-300 text-red-500 hover:border-red-500 hover:bg-red-50 px-3 py-1.5 text-xs"
                  onClick={handleCancel}
                >
                  Cancel Order
                </Button>
              ))}

            <Button
              variant="text"
              size="sm"
              className="text-blue-500 hover:bg-blue-50 flex items-center px-3 py-1.5 text-xs"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5 mr-1" /> Less Details
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5 mr-1" /> View Details
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Order Summary (always visible) */}
        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-sm text-gray-700">
          <div className="flex items-center mb-2 sm:mb-0">
            <span className="font-medium mr-2">Total:</span>
            <span className="text-gray-900 font-semibold">
              {handleTotalPaid()} EGP
            </span>
            <span className="mx-3 text-gray-400">|</span>
            <span className="font-medium mr-2">Items:</span>
            <span className="text-gray-900">{products.length}</span>
          </div>
          <StatusTimeline status={order.status} />
        </div>

        {/* Expandable section */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? "max-h-[2000px] opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <OrderDetails order={order} />
          <OrderProducts products={products} />
        </div>
      </div>
    </div>
  );
};

export default Order;