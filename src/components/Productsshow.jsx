import { FaStar, FaRegHeart } from "react-icons/fa";
import { MdAddShoppingCart, MdOutlineRemoveRedEye } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { productshow } from "../assets/productsShow";
const Productsshow = () => {
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
      id="products"
      className="w-full lg:px-20 px-5 py-[80px] bg-main flex flex-col justify-center items-center gap-2 border-t border-second"
    >
      <h1
        data-aos="zoom-in"
        data-aos-delay="100"
        className="text-brown-700 font-semibold text-center"
      >
        Browse Different Collections
      </h1>
      <h1
        data-aos="zoom-in"
        data-aos-delay="200"
        className="text-black font-semibold text-[42px] leading-[50px] text-center"
      >
        Discover Bestseller Products
      </h1>
      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        className="w-full grid lg:grid-cols-4 grid-cols1 justify-center items-center gap-10 mt-5"
      >
        {productshow.map((item, index) => (
          <div
            id="productbox"
            key={index}
            className="flex flex-col justify-center items-center gap-2 bg-gray-100 p-2 rounded-lg cursor-pointer relative"
          >
            <img src={item.image} alt="" className="mt-7" />
            <div
              id="icons"
              className="flex justify-center items-center gap-3 absolute top-[5px]"
            >
              <div
                className="bg-buttonColor hover:bg-hoverColor hover:text-black
              rounded-full p-2 text-white "
              >
                <MdOutlineRemoveRedEye />
              </div>
              <div
                className="bg-buttonColor hover:bg-hoverColor hover:text-black
              rounded-full p-2 text-white "
              >
                <FaRegHeart />
              </div>
              <div
                className="bg-buttonColor hover:bg-hoverColor hover:text-black
              rounded-full p-2 text-white "
              >
                <MdAddShoppingCart />
              </div>
            </div>
            <h1 className="text-l text-gray-600 font-thin ">{item.category}</h1>
            <h1 className="text-xl text-black font-semibold">{item.name}</h1>
            <h1 className="text-lg font-semibold">Price: ${item.price}</h1>
            <div className="flex justify-between items-center gap-6 mt-3">
              <div className="flex justify-start items-center gap-1 ">
                <FaStar className="text-yellow-800" />
                <FaStar className="text-yellow-800" />
                <FaStar className="text-yellow-800" />
                <FaStar className="text-yellow-800" />
                <FaStar className="text-yellow-800" />
                <FaStar className="text-yellow-800" />
              </div>
              <button className="bg-buttonColor text-white px-4 py-2 rounded-lg text-[13px] font-semibold">
                {" "}
                SALE 14%
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        data-aos="zoom-in"
        data-aos-delay="100"
        className="bg-buttonColor hover:bg-hoverColor text-white hover:text-black font-semibold px-8 py-3 rounded-lg mt-5"
      >
        VIEW MORE
      </button>
    </div>
  );
};

export default Productsshow;
