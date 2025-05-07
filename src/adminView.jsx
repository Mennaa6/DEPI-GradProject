import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import DashboardLayout from "./admindashboard/layouts/DashboardLayout";
import Dashboard from "./admindashboard/pages/Dashboard";
import ProductDetails from "./admindashboard/pages/ProductDetails";
import ProductForm from "./admindashboard/pages/ProductForm";
import AdProducts from "./admindashboard/pages/AdProducts";
import Users from "./admindashboard/pages/Users";
import UserForm from "./admindashboard/pages/UserForm";
import UserDetails from "./admindashboard/pages/UserDetails";
import AdNotFound from "./admindashboard/pages/AdNotFound";
import Orders from "./admindashboard/pages/Orders";
import OrderDetails from "./admindashboard/pages/OrderDetails";

const adminView = () => {
  return (
    <div>
      <Routes>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="products" element={<DashboardLayout />}>
          <Route index element={<AdProducts />} />
          <Route path="new" element={<ProductForm />} />
          <Route path=":id" element={<ProductDetails />} />
          <Route path=":id/edit" element={<ProductForm />} />
        </Route>

        <Route path="users" element={<DashboardLayout />}>
          <Route index element={<Users />} />
          <Route path="new" element={<UserForm />} />
          <Route path=":id" element={<UserDetails />} />
          <Route path=":id/edit" element={<UserForm />} />
        </Route>

        <Route path="orders" element={<DashboardLayout />}>
          <Route index element={<Orders />} />
          <Route path=":id" element={<OrderDetails />} />
        </Route>
        <Route path="*" element={<AdNotFound isAdmin={true}/>} />
      </Routes>
    </div>
  );
};

export default adminView;
