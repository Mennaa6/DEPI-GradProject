import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { ToastContainer } from "react-toastify";
import AdminView from "./adminView";
import UserView from "./userView";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Women from "./pages/collections/Women";
import Men from "./pages/collections/Men";
import Accessories from "./pages/collections/Accessories";
import OrderConfirmation from "./pages/OrderConfirmation";
import UserProfile from "./pages/UserProfile";
import Wishlist from "./pages/WishList";
import DeliveryTerms from "./pages/DeliveryTerms";

const App = () => {
  const location = useLocation();
  const [role] = useState("admin");

  const isNotFoundPage =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/sign-up" &&
    location.pathname !== "/products" &&
    location.pathname !== "/cart" &&
    location.pathname !== "/checkout" &&
    location.pathname !== "/women" &&
    location.pathname !== "/men" &&
    location.pathname !== "/accessories" &&
    location.pathname !== "/order-confirmation" &&
    location.pathname !== "/wishlist" &&
    location.pathname !== "/profile";

  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          const offset = 80;
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }
      }, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div>
      <ProductProvider>
        <ToastContainer position="top-right" />
        {!isNotFoundPage && <Header />}
        <Routes>
          <Route path="/*" element={<UserView />} />
          <Route
            path="/admin/*"
            element={role === "admin" ? <AdminView /> : <NotFound />}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/women" element={<Women />} />
          <Route path="/men" element={<Men />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/deliveryterms" element={<DeliveryTerms />} />
        </Routes>
      </ProductProvider>
    </div>
  );
};

export default App;
