import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import tshirt from "../assets/tshirt2.jpeg";
import hoodie from "../assets/hoodie.jpeg";
import jeans from "../assets/jeans.jpeg";
import earring from "../assets/earring.jpeg";
import jacket from "../assets/jacket.jpeg";
const Categories = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);
  return (
    <div
      id="category"
      className="w-full bg-main lg:px-20 px-5 pt-[130px] pb-[80px] flex lg:flex-row flex-col justify-center items-center gap-20"
    >
      <div
        data-aos="zoom-in"
        data-aos-delay="50"
        className="lg:w-[15%] w-full flex flex-col justify-center lg:items-start items-center gap-[20px] flex-nowrap mr-2"
      >
        <h1 className="text-black font-semibold lg:text-[42px] text-[30px] lg:text-start text-center leading-[50px] ">
          Popular Categories
        </h1>
        <button className="bg-buttonColor hover:bg-hoverColor text-white hover:text-black lg:px-8 px-7 py-3 rounded-lg font-semibold mt-[60px] ">
          VIEW ALL
        </button>
      </div>
      <div className="lg:w-[85%] w-fill grid lg:grid-cols-5 grid-cols-1 justify-center items-start gap-10">
        <div
          data-aos="zoom-in"
          data-aos-delay="100"
          className="flex flex-col justify-center items-center gap-6"
        >
          <img src={tshirt} alt="" className="rounded-full cursor-pointer " />
          <h1 className="text-black text-xl font-semibold hover:text-hoverColor  hover:cursor-pointer">
            T-SHIRTS
          </h1>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="200"
          className="flex flex-col justify-center items-center gap-6"
        >
          <img src={hoodie} alt="" className="rounded-full cursor-pointer " />
          <h1 className="text-black text-xl font-semibold  hover:cursor-pointer hover:text-hoverColor">
            HOODIES
          </h1>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="300"
          className="flex flex-col justify-center items-center gap-6"
        >
          <img src={jacket} alt="" className="rounded-full cursor-pointer " />
          <h1 className="text-black text-xl font-semibold hover:cursor-pointer hover:text-hoverColor">
            JACKETS
          </h1>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="400"
          className="flex flex-col justify-center items-center gap-6"
        >
          <img src={jeans} alt="" className="rounded-full cursor-pointer " />
          <h1 className="text-black text-xl font-semibold hover:cursor-pointer hover:text-hoverColor">
            JEANS
          </h1>
        </div>{" "}
        <div
          data-aos="zoom-in"
          data-aos-delay="500"
          className="flex flex-col justify-center items-center gap-6"
        >
          <img src={earring} alt="" className="rounded-full cursor-pointer " />
          <h1 className="text-black text-xl font-semibold hover:cursor-pointer hover:text-hoverColor">
            EARRINGS
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Categories;
