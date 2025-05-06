// Mock Sales Data
export const mockSalesData = [
  { date: "2025-05-01", revenue: 12500, orders: 34 },
  { date: "2025-05-02", revenue: 14200, orders: 42 },
  { date: "2025-05-03", revenue: 18000, orders: 53 },
  { date: "2025-05-04", revenue: 16800, orders: 47 },
  { date: "2025-05-05", revenue: 15600, orders: 44 },
  { date: "2025-05-06", revenue: 19300, orders: 57 },
  { date: "2025-05-07", revenue: 22100, orders: 65 },
  { date: "2025-05-08", revenue: 20800, orders: 64 },
  { date: "2025-05-09", revenue: 18400, orders: 51 },
  { date: "2025-05-10", revenue: 17900, orders: 48 },
  { date: "2025-05-11", revenue: 21500, orders: 62 },
  { date: "2025-05-12", revenue: 25300, orders: 69 },
  { date: "2025-05-13", revenue: 23800, orders: 67 },
  { date: "2025-05-14", revenue: 22000, orders: 63 },
];

// Mock Products Data
export const mockProducts = [
  {
    id: 1,
    name: "Apple MacBook Pro 16",
    category: "Electronics",
    price: 2499.99,
    stock: 23,
    description: "Powerful laptop with M2 chip, 16GB RAM, and 512GB SSD.",
    image:
      "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: 2,
    name: "Samsung Galaxy S25",
    category: "Electronics",
    price: 999.99,
    stock: 45,
    description:
      'Latest flagship smartphone with 6.8" AMOLED display and 108MP camera.',
    image:
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    category: "Electronics",
    price: 349.99,
    stock: 18,
    description:
      "Premium noise cancelling headphones with exceptional sound quality.",
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: 4,
    name: "Leather Jacket",
    category: "Clothing",
    price: 299.99,
    stock: 12,
    description: "Premium genuine leather jacket with quilted lining.",
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: 5,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 189.99,
    stock: 7,
    description: "Comfortable chair with lumbar support and adjustable height.",
    image:
      "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: 6,
    name: "Cast Iron Skillet",
    category: "Kitchen",
    price: 39.99,
    stock: 31,
    description:
      "10-inch pre-seasoned cast iron skillet for all cooking surfaces.",
    image:
      "https://images.pexels.com/photos/5824505/pexels-photo-5824505.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: 7,
    name: "Organic Coffee Beans",
    category: "Food",
    price: 14.99,
    stock: 52,
    description:
      "Fair trade, single-origin arabica coffee beans from Ethiopia.",
    image:
      "https://images.pexels.com/photos/773958/pexels-photo-773958.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: 8,
    name: "Yoga Mat",
    category: "Fitness",
    price: 29.99,
    stock: 25,
    description: "Non-slip, eco-friendly yoga mat with carrying strap.",
    image:
      "https://images.pexels.com/photos/4498126/pexels-photo-4498126.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: 9,
    name: "Wireless Gaming Mouse",
    category: "Electronics",
    price: 79.99,
    stock: 9,
    description: "High-precision gaming mouse with customizable RGB lighting.",
    image:
      "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: 10,
    name: "Smart Watch",
    category: "Electronics",
    price: 199.99,
    stock: 33,
    description: "Fitness tracker with heart rate monitor and GPS.",
    image:
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: 11,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 129.99,
    stock: 17,
    description: "Waterproof portable speaker with 24-hour battery life.",
    image:
      "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: 12,
    name: "Dress Shirt",
    category: "Clothing",
    price: 59.99,
    stock: 28,
    description: "Wrinkle-free cotton dress shirt in various colors.",
    image:
      "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
];

// Mock Recent Products (subset of products)
export const mockRecentProducts = mockProducts.slice(0, 5);

// Mock Users Data
export const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "active",
    joinedAt: "2024-12-15T08:30:00.000Z",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Manager",
    status: "active",
    joinedAt: "2025-01-08T10:15:00.000Z",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "Editor",
    status: "active",
    joinedAt: "2025-02-18T14:20:00.000Z",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    role: "User",
    status: "inactive",
    joinedAt: "2025-03-07T09:45:00.000Z",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: 5,
    name: "David Lee",
    email: "david.lee@example.com",
    role: "User",
    status: "active",
    joinedAt: "2025-03-12T16:30:00.000Z",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: 6,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Editor",
    status: "active",
    joinedAt: "2025-03-18T11:20:00.000Z",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: 7,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "User",
    status: "active",
    joinedAt: "2025-04-02T13:45:00.000Z",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: 8,
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    role: "User",
    status: "inactive",
    joinedAt: "2025-04-10T09:15:00.000Z",
    avatar:
      "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
];

// Mock Recent Users (subset of users)
export const mockRecentUsers = mockUsers.slice(0, 5);
// Mock Orders Data
export const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2025-001",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    items: [
      { id: 1, product: "Apple MacBook Pro 16", quantity: 1, price: 2499.99 },
      { id: 2, product: "Sony WH-1000XM5", quantity: 1, price: 349.99 },
    ],
    total: 2849.98,
    status: "completed",
    paymentStatus: "paid",
    shippingAddress: "123 Main St, New York, NY 10001",
    createdAt: "2025-05-14T10:30:00.000Z",
    updatedAt: "2025-05-14T15:45:00.000Z",
  },
  {
    id: 2,
    orderNumber: "ORD-2025-002",
    customer: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    items: [{ id: 1, product: "Leather Jacket", quantity: 1, price: 299.99 }],
    total: 299.99,
    status: "processing",
    paymentStatus: "paid",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    createdAt: "2025-05-14T11:15:00.000Z",
    updatedAt: "2025-05-14T11:15:00.000Z",
  },
  {
    id: 3,
    orderNumber: "ORD-2025-003",
    customer: {
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    items: [
      { id: 1, product: "Ergonomic Office Chair", quantity: 2, price: 189.99 },
      { id: 2, product: "Cast Iron Skillet", quantity: 1, price: 39.99 },
    ],
    total: 419.97,
    status: "pending",
    paymentStatus: "pending",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
    createdAt: "2025-05-14T12:00:00.000Z",
    updatedAt: "2025-05-14T12:00:00.000Z",
  },
  {
    id: 4,
    orderNumber: "ORD-2025-004",
    customer: {
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    items: [
      { id: 1, product: "Samsung Galaxy S25", quantity: 1, price: 999.99 },
    ],
    total: 999.99,
    status: "shipped",
    paymentStatus: "paid",
    shippingAddress: "321 Elm St, Houston, TX 77001",
    createdAt: "2025-05-14T13:45:00.000Z",
    updatedAt: "2025-05-14T16:30:00.000Z",
  },
  {
    id: 5,
    orderNumber: "ORD-2025-005",
    customer: {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    items: [
      { id: 1, product: "Sony WH-1000XM5", quantity: 1, price: 349.99 },
      { id: 2, product: "Cast Iron Skillet", quantity: 2, price: 39.99 },
    ],
    total: 429.97,
    status: "cancelled",
    paymentStatus: "refunded",
    shippingAddress: "654 Maple Ave, Seattle, WA 98101",
    createdAt: "2025-05-14T14:20:00.000Z",
    updatedAt: "2025-05-14T17:15:00.000Z",
  },
];
