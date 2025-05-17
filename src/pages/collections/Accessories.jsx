import { FaStar, FaRegHeart } from "react-icons/fa";
import { MdAddShoppingCart, MdOutlineRemoveRedEye } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect,useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import SingleProduct from "../../components/SingleProduct";
import { ProductContext } from '../../context/ProductContext';
import ProductCard from "../../components/ProductCard";


const Accessories = () => {
  const { products, loading } = useContext(ProductContext);
  const accessories = products.filter(
    (product) => product.category.toLowerCase() === "accessories"
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
        Accessories Collection
      </h1>
      {accessories && accessories.length > 0 ? (
        <div className=" grid lg:grid-cols-3 grid-cols-1 justify-center items-center lg:gap-10 gap-5 m-5 md:grid-cols-2">
          {accessories.map((item, index) => (
            <ProductCard product={item} key={index} />
          ))}
        </div>
      ) : (
        <Typography className="text-center">Loading products...</Typography>
      )}
    </div>
  );
};


export default Accessories;
