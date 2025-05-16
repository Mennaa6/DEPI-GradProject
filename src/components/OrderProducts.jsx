import React from "react";
import { Package } from "lucide-react";

const OrderProducts = ({ products }) => {
  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-500 mb-4 flex items-center">
        <Package className="h-4 w-4 mr-2 text-gray-400" />
        Order Items ({products.length})
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((item) => (
          <div
            key={item.product._id}
            className="flex border border-gray-100 rounded-lg overflow-hidden hover:border-gray-200 transition-all duration-200 hover:shadow-sm"
          >
            <div className="w-24 h-24 flex-shrink-0 bg-gray-50">
              <img
                src={item.product.image}
                alt={item.product.description}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 p-3">
              <h5 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                {item.product.description}
              </h5>
              <p className="text-sm font-bold text-gray-900">
                {item.product.price} EGP
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProducts;
