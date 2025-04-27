import { Route, Routes } from "react-router-dom";
// import NotFound from "./pages/NotFound";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Header from "./components/Header";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import ProductProvider from "./context/ProductContext";
import Checkout from "./pages/Checkout";

const App = () => {
  return (
    <div>
      <ProductProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} /> */}
          <Route path="/products" element={<Products />} />
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </ProductProvider>
    </div>
  );
};

export default App;
