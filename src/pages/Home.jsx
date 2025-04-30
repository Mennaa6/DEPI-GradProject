import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Productsshow from "../components/Productsshow";
import Services from "../components/Services";
import Type from "../components/Type";
const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <Type />
      <Productsshow />
      <Services />
    </div>
  );
};

export default Home;