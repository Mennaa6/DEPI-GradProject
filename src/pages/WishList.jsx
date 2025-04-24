import Faved from "../components/Faved";
import { products } from "../../assets/assets";
const WishList = () => {
  return (
    <div className="sm:grid sm:grid-cols-3 md:grid-cols-4 p-5 pl-16 sm:pl-10 sm:gap-0  sm:gap-y-16 flex flex-col gap-8 sm:text-[0.8em] bg-[#E4E0E1]">
      {products.map((item) => {
        return <Faved loc={ "../.." + item.image} key={item._id} />;
      })}
    </div>
  );
};

export default WishList;
