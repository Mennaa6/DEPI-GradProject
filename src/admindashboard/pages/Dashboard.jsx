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
          totalUsers: 20,
          totalRevenue: 10400.42,
          totalOrders: 51,
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
    labels: ["Men", "Women", "Accessories"],
    datasets: [
      {
        data: [35, 25, 20],
        backgroundColor: [
          "#3B82F6", // primary
          "#10B981", // success
          "#F59E0B", // warning
        ],
        borderWidth: 0,
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
              value={`${stats.totalRevenue.toLocaleString()} EGP`}
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
