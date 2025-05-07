import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaEye,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaFilter,
} from "react-icons/fa";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import PageTitle from "../components/PageTitle";
import { mockOrders } from "../data/mockData";
import { format } from "date-fns";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  const navigate = useNavigate();

  // Order status options
  const statusOptions = [
    "All",
    "pending",
    "processing",
    "shipped",
    "completed",
    "cancelled",
  ];

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle sort
  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  // Handle status filter
  const handleStatusFilter = (status) => {
    setSelectedStatus(status === "All" ? "" : status);
    setCurrentPage(1);
    setFilterOpen(false);
  };

  // Get status chip color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "processing":
        return "blue";
      case "shipped":
        return "purple";
      case "pending":
        return "amber";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  // Filter and sort orders
  const filteredOrders = orders
    .filter(
      (order) =>
        (order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.customer.email
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        (selectedStatus === "" || order.status === selectedStatus)
    )
    .sort((a, b) => {
      const aValue = sortBy === "total" ? a[sortBy] : new Date(a[sortBy]);
      const bValue = sortBy === "total" ? b[sortBy] : new Date(b[sortBy]);

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortBy !== key) return <FaSort className="text-gray-400" />;
    if (sortOrder === "asc") return <FaSortUp className="text-primary-500" />;
    return <FaSortDown className="text-primary-500" />;
  };

  return (
    <div>
      <PageTitle title="Orders" subtitle="Manage customer orders" />

      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Button
                  variant="outlined"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <FaFilter size={14} />
                  Filter
                  {selectedStatus && (
                    <span className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full">
                      {selectedStatus}
                    </span>
                  )}
                </Button>

                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fadeIn">
                    {statusOptions.map((status, index) => (
                      <button
                        key={index}
                        onClick={() => handleStatusFilter(status)}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          (status === "All" && selectedStatus === "") ||
                          status === selectedStatus
                            ? "bg-primary-50 text-primary-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selectedStatus && (
                <button
                  onClick={() => handleStatusFilter("All")}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>

          {/* Orders Table */}
          {loading ? (
            <div className="animate-pulse">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="border-b border-gray-200 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="w-24 h-8 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <>
              {filteredOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Typography variant="h6" className="text-gray-500">
                    No orders found
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="text-gray-400 mt-1"
                  >
                    Try adjusting your search or filter criteria
                  </Typography>
                </div>
              ) : (
                <>
                  {/* Desktop View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order Details
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("total")}
                          >
                            <div className="flex items-center space-x-1">
                              <span>Total</span>
                              {getSortIcon("total")}
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("createdAt")}
                          >
                            <div className="flex items-center space-x-1">
                              <span>Date</span>
                              {getSortIcon("createdAt")}
                            </div>
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full overflow-hidden">
                                  <img
                                    src={order.customer.avatar}
                                    alt=""
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <Typography
                                    variant="small"
                                    className="font-medium text-gray-900"
                                  >
                                    {order.orderNumber}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    className="text-gray-500"
                                  >
                                    {order.customer.name}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Typography
                                variant="small"
                                className="font-medium text-gray-900"
                              >
                                ${order.total.toFixed(2)}
                              </Typography>
                              <Typography
                                variant="small"
                                className="text-gray-500"
                              >
                                {order.items.length} items
                              </Typography>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Chip
                                value={
                                  order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)
                                }
                                color={getStatusColor(order.status)}
                                size="sm"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {format(new Date(order.createdAt), "MMM d, yyyy")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button
                                variant="text"
                                color="blue"
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={() =>
                                  navigate(`/admin/orders/${order.id}`)
                                }
                              >
                                <FaEye size={16} /> View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden">
                    {currentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border-b border-gray-200 py-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img
                                src={order.customer.avatar}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <Typography
                                variant="small"
                                className="font-medium text-gray-900"
                              >
                                {order.orderNumber}
                              </Typography>
                              <Typography
                                variant="small"
                                className="text-gray-500"
                              >
                                {order.customer.name}
                              </Typography>
                              <div className="flex items-center mt-1 space-x-2">
                                <Typography
                                  variant="small"
                                  className="text-gray-600"
                                >
                                  ${order.total.toFixed(2)}
                                </Typography>
                                <span className="text-gray-300">•</span>
                                <Typography
                                  variant="small"
                                  className="text-gray-600"
                                >
                                  {order.items.length} items
                                </Typography>
                              </div>
                              <div className="mt-2">
                                <Chip
                                  value={
                                    order.status.charAt(0).toUpperCase() +
                                    order.status.slice(1)
                                  }
                                  color={getStatusColor(order.status)}
                                  size="sm"
                                />
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="text"
                            color="blue"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() =>
                              navigate(`/admin/orders/${order.id}`)
                            }
                          >
                            <FaEye size={16} /> View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-6">
                      <div className="text-sm text-gray-500">
                        Showing {indexOfFirstOrder + 1} to{" "}
                        {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
                        {filteredOrders.length} orders
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`px-3 py-1 rounded ${
                            currentPage === 1
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          Prev
                        </button>

                        {[...Array(totalPages)].map((_, index) => {
                          const pageNumber = index + 1;
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => paginate(pageNumber)}
                              className={`px-3 py-1 rounded ${
                                currentPage === pageNumber
                                  ? "bg-primary-100 text-primary-700"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}

                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-1 rounded ${
                            currentPage === totalPages
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Orders;
