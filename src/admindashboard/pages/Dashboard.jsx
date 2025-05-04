import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaExclamationCircle,
} from "react-icons/fa";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { format } from "date-fns";
import PageTitle from "../components/PageTitle";
import {
  mockSalesData,
  mockRecentProducts,
  mockRecentUsers,
} from "../data/mockData";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      // In a real app, fetch data from API
      setTimeout(() => {
        setStats({
          totalProducts: 1249,
          totalUsers: 846,
          totalRevenue: 284591.42,
          totalOrders: 4751,
        });
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  // Sales chart data
  const salesChartData = {
    labels: mockSalesData.map((item) => format(new Date(item.date), "MMM d")),
    datasets: [
      {
        label: "Revenue",
        data: mockSalesData.map((item) => item.revenue),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Orders",
        data: mockSalesData.map((item) => item.orders * 100), // Scale for better visualization
        borderColor: "#10B981",
        backgroundColor: "transparent",
        tension: 0.4,
      },
    ],
  };

  // Product category chart data
  const categoryChartData = {
    labels: ["Electronics", "Clothing", "Food", "Furniture", "Others"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "#3B82F6", // primary
          "#10B981", // success
          "#F59E0B", // warning
          "#6366F1", // secondary
          "#9CA3AF", // gray
        ],
        borderWidth: 0,
      },
    ],
  };

  // Traffic sources chart data
  const trafficChartData = {
    labels: ["Organic", "Direct", "Referral", "Social", "Email"],
    datasets: [
      {
        label: "Traffic Sources",
        data: [25, 20, 18, 22, 15],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(99, 102, 241, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(239, 68, 68, 0.7)",
        ],
        borderRadius: 4,
      },
    ],
  };

  // Skeleton loading component
  const StatSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded-md mb-4"></div>
      <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>
    </div>
  );

  // Stat card component
  const StatCard = ({ title, value, icon, trend, trendValue, color }) => (
    <Card className="overflow-hidden">
      <CardBody className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-medium text-gray-600"
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              color="blue-gray"
              className="font-bold mt-1"
            >
              {value}
            </Typography>
          </div>
          <div className={`p-3 rounded-md bg-${color}-100 text-${color}-600`}>
            {icon}
          </div>
        </div>
        <div className="flex items-center mt-3">
          {trend === "up" ? (
            <FaArrowUp className="text-success-500 mr-1" />
          ) : (
            <FaArrowDown className="text-error-500 mr-1" />
          )}
          <Typography
            variant="small"
            className={`font-medium ${
              trend === "up" ? "text-success-500" : "text-error-500"
            }`}
          >
            {trendValue}
          </Typography>
          <Typography
            variant="small"
            className="font-normal text-gray-500 ml-1"
          >
            since last month
          </Typography>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div>
      <PageTitle title="Dashboard" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {loading ? (
          <>
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Total Products"
              value={stats.totalProducts.toLocaleString()}
              icon={<FaBox size={20} />}
              trend="up"
              trendValue="12%"
              color="primary"
            />
            <StatCard
              title="Total Users"
              value={stats.totalUsers.toLocaleString()}
              icon={<FaUsers size={20} />}
              trend="up"
              trendValue="8%"
              color="secondary"
            />
            <StatCard
              title="Total Revenue"
              value={`$${stats.totalRevenue.toLocaleString()}`}
              icon={<FaMoneyBillWave size={20} />}
              trend="up"
              trendValue="15%"
              color="success"
            />
            <StatCard
              title="Total Orders"
              value={stats.totalOrders.toLocaleString()}
              icon={<FaChartLine size={20} />}
              trend="down"
              trendValue="3%"
              color="warning"
            />
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardBody>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              Revenue & Orders
            </Typography>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-md"></div>
              </div>
            ) : (
              <div className="h-72">
                <Line
                  data={salesChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          display: true,
                          color: "rgba(0, 0, 0, 0.05)",
                        },
                      },
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: "top",
                        align: "end",
                      },
                    },
                  }}
                />
              </div>
            )}
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardBody>
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-4 font-medium"
              >
                Product Categories
              </Typography>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-md"></div>
                </div>
              ) : (
                <div className="h-72 flex justify-center items-center">
                  <div className="w-48 h-48">
                    <Doughnut
                      data={categoryChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        cutout: "75%",
                        plugins: {
                          legend: {
                            position: "right",
                            align: "center",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-4 font-medium"
              >
                Traffic Sources
              </Typography>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-md"></div>
                </div>
              ) : (
                <div className="h-72">
                  <Bar
                    data={trafficChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.05)",
                          },
                        },
                        x: {
                          grid: {
                            display: false,
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <Typography
                variant="h6"
                color="blue-gray"
                className="font-medium"
              >
                Recent Products
              </Typography>
              <Link
                to="/admin/products"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading
                    ? Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <tr key={index} className="animate-pulse">
                            <td className="px-4 py-4">
                              <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                            </td>
                          </tr>
                        ))
                    : mockRecentProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                <img
                                  src={product.image}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                                  {product.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            {product.stock > 10 ? (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700">
                                In Stock
                              </span>
                            ) : product.stock > 0 ? (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-50 text-yellow-700">
                                Low Stock
                              </span>
                            ) : (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-50 text-red-700">
                                Out of Stock
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <Typography
                variant="h6"
                color="blue-gray"
                className="font-medium"
              >
                Recent Users
              </Typography>
              <Link
                to="/admin/users"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading
                    ? Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <tr key={index} className="animate-pulse">
                            <td className="px-4 py-4">
                              <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                            </td>
                          </tr>
                        ))
                    : mockRecentUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden">
                                <img
                                  src={user.avatar}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">
                                  {user.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {user.role}
                          </td>
                          <td className="px-4 py-3">
                            {user.status === "active" ? (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700">
                                Active
                              </span>
                            ) : (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-50 text-gray-700">
                                Inactive
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {format(new Date(user.joinedAt), "MMM d, yyyy")}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
