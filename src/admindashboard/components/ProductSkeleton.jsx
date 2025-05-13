import React from "react";

const ProductSkeleton = ({ count = 6, type = "list" }) => {
  if (type === "detail") {
    return (
      <div className="animate-pulse">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="md:w-2/3">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="flex gap-2">
              <div className="h-10 w-20 bg-gray-200 rounded"></div>
              <div className="h-10 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "form") {
    return (
      <div className="animate-pulse">
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="border-b border-gray-200 py-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-24 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductSkeleton;
