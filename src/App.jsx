import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import ProductProvider from "./context/ProductContext";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();
  const isNotFoundPage =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/sign-up" &&
    location.pathname !== "/products" &&
    location.pathname !== "/cart" &&
    location.pathname !== "/checkout";

  // Scroll to top on route change and handle hash navigation
  useEffect(() => {
    // Scroll to top on pathname change
    window.scrollTo(0, 0);

    // Handle hash scrolling (if any) after a short delay to ensure page is at top
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          const offset = 80; // Adjust for fixed header height
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }
      }, 0); // Delay to allow initial scroll to top
    }
  }, [location.pathname, location.hash]); // Trigger on pathname or hash change
  return (
    <div>
      <ProductProvider>
        {!isNotFoundPage && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!isNotFoundPage && <Footer />}
      </ProductProvider>
    </div>
  );
};

export default App;
