import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Productsshow from "../components/Productsshow";
import Services from "../components/Services";
import Type from "../components/Type";
import Header from "./../components/Header";
const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Categories />
      <Type />
      <Productsshow />
      <Services />
      <Footer />
    </div>
  );
};

export default Home;
