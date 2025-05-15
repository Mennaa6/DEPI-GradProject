import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect, useContext } from "react";
import { Typography } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "../../components/ProductCard";

const Women = () => {
  const { products, loading } = useContext(ProductContext);
  const women = products.filter(
    (product) => product.category.toLowerCase() === "women"
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
        Women Collection
      </h1>
      {women && women.length > 0 ? (
        <div className=" grid lg:grid-cols-3 grid-cols-1 justify-center items-center lg:gap-10 gap-5 m-5 md:grid-cols-2">
          {women.map((item, index) => (
            <ProductCard product={item} key={index} />
          ))}
        </div>
      ) : (
        <Typography className="text-center">Loading products...</Typography>
      )}
    </div>
  );
};

export default Women;
