import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import Women from "./pages/collections/Women";
import Men from "./pages/collections/Men";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Accessories from "./pages/collections/Accessories";
import UserProfile from "./pages/UserProfile";
import Wishlist from "./pages/WishList";
import DeliveryTerms from "./pages/DeliveryTerms";

const userView = () => {
  const location = useLocation();
  const isNotFoundPage =
    location.pathname !== "/" &&
    location.pathname !== "/products" &&
    location.pathname !== "/cart" &&
    location.pathname !== "/checkout" &&
    location.pathname !== "/women" &&
    location.pathname !== "/men" &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/accessories" &&
    location.pathname !== "/wishlist" &&
    location.pathname !== "/profile";

  // Scroll to top on route change and handle hash navigation
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
      {!isNotFoundPage && <Header />}
      <Routes>
        <Route index element={<Home />} />
        {/* <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} /> */}
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="women" element={<Women />} />
        <Route path="men" element={<Men />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="accessories" element={<Accessories />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="deliveryterms" element={<DeliveryTerms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isNotFoundPage && <Footer />}
    </div>
  );
};

export default userView;
