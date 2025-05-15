import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from './context/CartContext';
import { ToastContainer } from "react-toastify";
import AdminView from "./adminView";
import UserView from "./userView";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const App = () => {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate initial loading
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 800);
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-gray-50">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
  //     </div>
  //   );
  // }

  // this is supposed to be changed when backend reaches
  const [role] = useState("admin");

  return (
    <div>
      <ProductProvider>
        <CartProvider>
        <ToastContainer position="top-right" />
        <Routes>
          <Route path="/*" element={<UserView />} />
          <Route
            path="/admin/*"
            element={role == "admin" ? <AdminView /> : <NotFound />}
          />
          <Route path="*" element={<NotFound />} />
          </Routes>
          </CartProvider>
      </ProductProvider>
    </div>
  );
};

export default App;
