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

const App = () => {
  const location = useLocation();
  const isNotFoundPage =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/sign-up" &&
    location.pathname !== "/products" &&
    location.pathname !== "/cart" &&
    location.pathname !== "/checkout";

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
