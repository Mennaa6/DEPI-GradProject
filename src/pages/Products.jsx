import { FaStar, FaRegHeart } from "react-icons/fa";
import { MdAddShoppingCart, MdOutlineRemoveRedEye } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import SingleProduct from "../components/SingleProduct";
import { FaSearch } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";

const Products = () => {
  const { products, loading } = useContext(ProductContext);

  // const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // const fetchData = () => {
  //   fetch("https://spotted-thankful-mambo.glitch.me/products")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const allProducts = [...data.men, ...data.women, ...data.accessories];
  //       setProducts(allProducts);
  //       setLoading(false);
  //     })
  //     .catch((e) => console.log(e.message));
  // };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-out",
    });
    AOS.refresh();

    //   fetchData();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
        className="text-brown-700 font-semibold text-[42px] leading-[50px] text-center mb-2"
      >
        Browse All Products
      </h1>
      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        className="w-full max-w-sm min-w-[200px]"
      >
        <div className="relative flex items-center">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
          >
            <FaSearch size={20} className="text-brown-400" />;
          </svg>

          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 text-sm border border-second rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-white hover:border-gray-300 shadow-md focus:shadow"
            placeholder="Search product name..."
          />
        </div>
      </div>

      <div className=" grid lg:grid-cols-3 grid-cols-1 justify-center items-center lg:gap-11 gap-5 m-5 md:grid-cols-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Card
              data-aos="zoom-in"
              data-aos-delay="100"
              key={item.id}
              className="w-full relative "
            >
              <CardHeader shadow={false} floated={false} className="h-96 ">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />

                <div
                  id="icons"
                  className="flex w-full justify-center items-center gap-3 absolute top-[1px]"
                >
                  <div
                    className="bg-buttonColor hover:bg-hoverColor hover:text-black
              rounded-full p-2 text-white cursor-pointer"
                    onClick={() => handleProductClick(item)}
                  >
                    <MdOutlineRemoveRedEye />
                  </div>
                  <div
                    className="bg-buttonColor hover:bg-hoverColor hover:text-black
              rounded-full p-2 text-white cursor-pointer"
                  >
                    <FaRegHeart />
                  </div>
                  <div
                    className="bg-buttonColor hover:bg-hoverColor hover:text-black
              rounded-full p-2 text-white cursor-pointer"
                    onClick={() => handleProductClick(item)}
                  >
                    <MdAddShoppingCart />
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <Typography color="blue-gray" className="font-semibold">
                    {item.name}
                  </Typography>
                  <Typography color="blue-gray" className="font-medium">
                    ${item.price}
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75"
                >
                  {item.description}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-buttonColor  hover:bg-hoverColor text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  onClick={() => handleProductClick(item)}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Typography
            variant="h5"
            className=" w-full text-center col-span-full text-brown-700 mt-4 mb-10"
          >
            No matches found...
          </Typography>
        )}
      </div>
      {/* Render SingleProduct dialog */}
      {selectedProduct && (
        <SingleProduct
          open={openDialog}
          handleClose={handleCloseDialog}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Products;
