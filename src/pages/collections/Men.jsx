import AOS from "aos";
import "aos/dist/aos.css";
import React, {useEffect, useContext } from "react";
import {
  Typography
} from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "../../components/ProductCard";

const Men = () => {
  const { products, loading } = useContext(ProductContext);
  const men = products.filter(
    (product) => product.category.toLowerCase() === "men"
  );


  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="brown" className="h-16 w-16" />
      </div>
    );
  }

  return (
    <div className="w-full lg:px-10 px-5 py-[40px] bg-main flex flex-col justify-center items-center gap-2">
      <h1
        data-aos="zoom-in"
        data-aos-delay="200"
        className="text-brown-700 font-semibold text-[42px] leading-[50px] text-center"
      >
        Men Collection
      </h1>
      {men && men.length > 0 ? (
        <div className=" grid lg:grid-cols-3 grid-cols-1 justify-center items-center lg:gap-10 gap-5 m-5 md:grid-cols-2">
          {men.map((item, index) => <ProductCard product={item} key={index} />)}
        </div>
      ) : (
        <Typography className="text-center">Loading products...</Typography>
      )}
    </div>
  );
};

export default Men;
