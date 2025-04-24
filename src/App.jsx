import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Header from "./components/Header";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import Type from "./components/Type";
import Categories from "./components/Categories";
import Services from "./components/Services";
import Productsshow from "./components/Productsshow";
import Banner from "./components/Banner";

const App = () => {
  return (
    <div>
      <Header />
      <Banner />

      <Categories />
      <Type />

      <Productsshow />
      <Services />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
