import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import { ProductProvider } from "./context/ProductContext";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Women from "./pages/collections/Women";
import Men from "./pages/collections/Men";
import Accessories from "./pages/collections/Accessories";
import UserProfile from "./pages/UserProfile";
import Wishlist from "./pages/WishList";
import DeliveryTerms from "./pages/DeliveryTerms";
import { ToastContainer } from "react-toastify";
import AdminView from "./adminView";

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

  const location = useLocation();
  const isNotFoundPage =
    location.pathname !== "/" &&
    // location.pathname !== "/login" &&
    // location.pathname !== "/sign-up" &&
    location.pathname !== "/products" &&
    location.pathname !== "/cart" &&
    location.pathname !== "/checkout" &&
    location.pathname !== "/women" &&
    location.pathname !== "/men" &&
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
      <ProductProvider>
        <ToastContainer position="top-right" />
        {!isNotFoundPage && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} /> */}
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/women" element={<Women />} />
          <Route path="/men" element={<Men />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/deliveryterms" element={<DeliveryTerms />} />
          <Route path="*" element={<NotFound />} />
          
          
          
          <Route path="/admin/*" element={<AdminView />} />
        </Routes>

        {!isNotFoundPage && <Footer />}
      </ProductProvider>
    </div>
  );
};

export default App;
