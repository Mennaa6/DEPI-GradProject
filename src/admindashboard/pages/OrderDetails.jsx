import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBox,
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

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch from API using the ID
    const fetchOrder = async () => {
      try {
        // Simulate API delay
        setTimeout(() => {
          const foundOrder = mockOrders.find((o) => o.id === parseInt(id));
          if (foundOrder) {
            setOrder(foundOrder);
          }
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching order:", error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

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

  if (loading) {
    return (
      <div>
        <div className="flex items-center mb-6">
          <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="animate-pulse">
              <CardBody>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div>
            <Card className="animate-pulse">
              <CardBody>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Order Not Found
        </Typography>
        <Typography variant="paragraph" className="text-gray-600 mb-6">
          The order you are looking for does not exist or has been removed.
        </Typography>
        <Button
          color="blue"
          variant="text"
          className="flex items-center gap-2 mx-auto"
          onClick={() => navigate("/admin/orders")}
        >
          <FaArrowLeft /> Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <PageTitle title={`Order ${order.orderNumber}`} />
          <div className="flex items-center gap-3 mt-2">
            <Chip
              value={
                order.status.charAt(0).toUpperCase() + order.status.slice(1)
              }
              color={getStatusColor(order.status)}
            />
            <Typography variant="small" className="text-gray-600">
              Placed on {format(new Date(order.createdAt), "MMMM d, yyyy")}
            </Typography>
          </div>
        </div>

        <Button
          variant="outlined"
          color="gray"
          size="sm"
          className="flex items-center gap-2 mt-4 md:mt-0"
          onClick={() => navigate("/admin/orders")}
        >
          <FaArrowLeft size={14} /> Back to Orders
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardBody>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Order Items
              </Typography>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4 border-b last:border-0"
                  >
                    <div className="flex items-center">
                      <FaBox className="text-gray-400 mr-3" />
                      <div>
                        <Typography
                          variant="small"
                          className="font-medium text-gray-900"
                        >
                          {item.product}
                        </Typography>
                        <Typography variant="small" className="text-gray-600">
                          Quantity: {item.quantity}
                        </Typography>
                      </div>
                    </div>
                    <Typography
                      variant="small"
                      className="font-medium text-gray-900"
                    >
                      ${item.price.toFixed(2)}
                    </Typography>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between mb-2">
                  <Typography variant="small" className="text-gray-600">
                    Subtotal
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-medium text-gray-900"
                  >
                    ${order.total.toFixed(2)}
                  </Typography>
                </div>
                <div className="flex justify-between mb-2">
                  <Typography variant="small" className="text-gray-600">
                    Shipping
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-medium text-gray-900"
                  >
                    Free
                  </Typography>
                </div>
                <div className="flex justify-between pt-4 border-t">
                  <Typography variant="h6" color="blue-gray">
                    Total
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    ${order.total.toFixed(2)}
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Customer and Shipping Info */}
        <div>
          <Card className="mb-6">
            <CardBody>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Customer Information
              </Typography>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaUser className="text-gray-400 mt-1 mr-3" />
                  <div>
                    <Typography
                      variant="small"
                      className="font-medium text-gray-900"
                    >
                      {order.customer.name}
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      {order.customer.email}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-gray-400 mt-1 mr-3" />
                  <div>
                    <Typography
                      variant="small"
                      className="font-medium text-gray-900"
                    >
                      Shipping Address
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      {order.shippingAddress}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaCreditCard className="text-gray-400 mt-1 mr-3" />
                  <div>
                    <Typography
                      variant="small"
                      className="font-medium text-gray-900"
                    >
                      Payment Status
                    </Typography>
                    <Chip
                      value={
                        order.paymentStatus.charAt(0).toUpperCase() +
                        order.paymentStatus.slice(1)
                      }
                      color={
                        order.paymentStatus === "paid"
                          ? "green"
                          : order.paymentStatus === "refunded"
                          ? "amber"
                          : "red"
                      }
                      size="sm"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Order Timeline
              </Typography>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <div className="ml-4">
                    <Typography
                      variant="small"
                      className="font-medium text-gray-900"
                    >
                      Order Placed
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      {format(new Date(order.createdAt), "MMM d, yyyy h:mm a")}
                    </Typography>
                  </div>
                </div>
                {order.status !== "pending" && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <div className="ml-4">
                      <Typography
                        variant="small"
                        className="font-medium text-gray-900"
                      >
                        Status Updated
                      </Typography>
                      <Typography variant="small" className="text-gray-600">
                        {format(
                          new Date(order.updatedAt),
                          "MMM d, yyyy h:mm a"
                        )}
                      </Typography>
                    </div>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
