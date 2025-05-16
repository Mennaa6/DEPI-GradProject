import {FaRegHeart, FaHeart } from "react-icons/fa";
import { MdAddShoppingCart, MdOutlineRemoveRedEye } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useState, useRef, useEffect, useContext } from "react";
import SingleProduct from "./SingleProduct";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  list,
} from "@material-tailwind/react";
import { ProductContext } from "../context/ProductContext";

const productCard = ({ product }) => {
  const { wishlistItems,setWishlistItems } = useContext(ProductContext);

  function checkIsFav() {
    return wishlistItems.some((item) => item._id == product._id);
  }


  const [isFav, setIsFav] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const debounceTimer = useRef(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  function addToFav() {
    setWishlistItems([...wishlistItems, product]);
    const userId = JSON.parse(window.localStorage.getItem("user")).id;
    if (userId) {
      fetch("https://depis3.vercel.app/api/wishlist/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId: product._id,
        }),
      });
    } else {
      console.log("fetch error");
    }
  }

  function removeFromFav() {
    setWishlistItems(wishlistItems.filter((item) => item._id != product._id));
    const userId = JSON.parse(window.localStorage.getItem("user")).id;
    if (userId) {
      fetch("https://depis3.vercel.app/api/wishlist/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId: product._id,
        }),
      });
    } else {
      console.log("fetch error");
    }
  }

  function toggleFav() {
    const newFavState = !isFav;
    setIsFav(!isFav);
    // if (debounceTimer.current) {
    //   clearTimeout(debounceTimer.current);
    // }

    // debounceTimer.current = setTimeout(() => {
      if (newFavState) {
        addToFav();
      } else {
        removeFromFav();
      }
    // }, 100);
  }

  useEffect(() => {
    setIsFav(wishlistItems.some((item) => item._id == product._id));
  },[isFav]);
  return (
    <div>
      <Card
        data-aos="zoom-in"
        data-aos-delay="100"
        key={product._id}
        className="w-full relative "
      >
        <CardHeader shadow={false} floated={false} className="h-96 ">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          <div
            id="icons"
            className="flex w-full justify-center items-center gap-3 absolute top-[1px]"
          >
            <div
              className="bg-buttonColor hover:bg-hoverColor hover:text-black
              rounded-full p-2 text-white cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <MdOutlineRemoveRedEye />
            </div>

            {checkIsFav() ? (
              <div
                className="bg-buttonColor hover:bg-hoverColor hover:text-black rounded-full p-2 text-white cursor-pointer"
                onClick={() => {
                  toggleFav();
                }}
              >
                <FaHeart />
              </div>
            ) : (
              <div
                className="bg-buttonColor hover:bg-hoverColor hover:text-black rounded-full p-2 text-white cursor-pointer"
                onClick={() => {
                  toggleFav();
                }}
              >
                <FaRegHeart />
              </div>
            )}
            <div
              className="bg-buttonColor hover:bg-hoverColor hover:text-black
              rounded-full p-2 text-white cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <MdAddShoppingCart />
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-semibold">
              {product.name}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              ${product.price}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {product.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-buttonColor  hover:bg-hoverColor text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            onClick={() => handleProductClick(product)}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
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

export default productCard;
