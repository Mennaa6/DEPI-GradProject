import { FaStar, FaRegHeart } from "react-icons/fa";
import { MdAddShoppingCart, MdOutlineRemoveRedEye } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  list,
} from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import SingleProduct from "../components/SingleProduct";
import { useNavigate } from "react-router-dom";

const Men = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const fetchData = () => {
    const userId = JSON.parse(window.localStorage.getItem("id"));
    fetch(`https://spotted-thankful-mambo.glitch.me/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const listItems = data.wishlist;
        fetch("https://spotted-thankful-mambo.glitch.me/products")
          .then((res) => res.json())
          .then((productData) => {
            const allProducts = [
              ...productData.men,
              ...productData.women,
              ...productData.accessories,
            ];
            const userProducts = [];
            listItems.forEach((productId) => {
              let product = allProducts.find(
                (productItem) => productItem.id == productId
              );
              userProducts.push(product);
              setProducts(userProducts);
            });
            console.log(userProducts);
            
          });
        setLoading(false);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    if (!window.localStorage.getItem("id")) {
      window.localStorage.setItem("id", "1");
      navigate("/login");
    }

    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-out",
    });
    AOS.refresh();

    fetchData();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

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
        Wishlist
      </h1>
      <div className=" grid lg:grid-cols-3 grid-cols-1 justify-center items-center lg:gap-10 gap-5 m-5 md:grid-cols-2">
        {products && products.length > 0 ? (
          products.map((item) => (
            <Card
              data-aos="zoom-in"
              data-aos-delay="100"
              key={item.id}
              className="w-full relative "
            >
              <CardHeader shadow={false} floated={false} className="h-96 ">
                <img
                  src={item.thumbnail}
                  alt={item.title}
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
                    <FaRegHeart  />
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
                    {item.title}
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
          <Typography className="text-center">Loading products...</Typography>
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

export default Men;
