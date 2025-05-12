import React from "react";
import { Check, Clock, Truck, Package } from "lucide-react";

const StatusTimeline = ({ status }) => {
  const statuses = ["pending", "shipped", "delivered"];
  const currentIndex = statuses.indexOf(status.toLowerCase());

  const getStatusIcon = (step) => {
    switch (step) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <Package className="h-4 w-4" />;
      default:
        return <Check className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {statuses.map((step, index) => {
        const isActive = index <= currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <React.Fragment key={step}>
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full 
              ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {isCompleted ? (
                <Check className="h-3 w-3" />
              ) : (
                getStatusIcon(step)
              )}
            </div>

            {index < statuses.length - 1 && (
              <div
                className={`w-8 h-0.5 
                ${index < currentIndex ? "bg-blue-500" : "bg-gray-200"}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StatusTimeline;
