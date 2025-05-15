import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  Chip,
} from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const SingleProduct = ({ open, handleClose, product }) => {
  const { fetchData } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = ["XS", "S", "M", "L", "XL"];
  const navigate = useNavigate();
  if (!product) return null;

  
  function handleAddToCart() {
    const userId = JSON.parse(window.localStorage.getItem("user"))?.id;
    if (!userId) {
      toast.warn("⚠️ Please log in to add items to your cart.");
      navigate("/login");
      return;
    }
    if (userId) {
      fetch("https://depis3.vercel.app/api/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
          userId,
        }),
      }).then((response) => {
        if (!response.ok) { 
        console.error("failed to add to cart");
        return;}
        toast.success("🛒 Item added to cart!",{autoClose: 1500, });
        fetchData();
      }).catch(
        (err) => {
          console.log(err);
          toast.error("Something went wrong. Please try again.")
        }
      );
    } else {
      console.log("fetch error");  
    }
  }
  
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
  return (
    <Dialog
      open={open}
      handler={handleClose}
      className="p-3 w-full max-w-3xl
    max-h-[95vh] overflow-y-auto
    lg:max-h-none lg:overflow-visible"
    >
      <DialogHeader className="flex justify-between items-center">
        <Typography variant="h5" color="blue-gray">
          {product.name}
        </Typography>
        <Button
          variant="text"
          color="red"
          onClick={handleClose}
          className="text-black hover:text-red-500"
        >
          <MdCancelPresentation size={30} />
        </Button>
      </DialogHeader>
      <DialogBody divider className="flex flex-col md:flex-row gap-5">
        <div className="md:w-1/2 flex flex-col justify-between items-center ">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <Typography className="text-2xl mb-3" color="blue-gray">
            PRICE: ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="paragraph" color="gray">
            {product.description}
          </Typography>

          <div className="flex items-center gap-1">
            <Typography variant="small" color="blue-gray">
              <span className="text-black"> RATING: </span>
            </Typography>

            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.round(product.rating)
                    ? "text-yellow-800"
                    : "text-gray-400"
                }
              />
            ))}
          </div>
          <Typography variant="small" color="blue-gray" className="capitalize">
            <span className="text-black "> CATEGORY: </span> {product.category}
          </Typography>

          <Typography
            variant="small"
            color={product.available === true ? "green" : "red"}
          >
            <span className="text-black"> AVAILABLITY: </span>
            {product.available === true ? "In Stock" : "Out of Stock"}
          </Typography>

          {/* Sizes Selection */}
          {product.category !== "accessories" && (
            <div className="flex flex-col gap-2">
              <Typography variant="small" color="blue-gray">
                <span className="text-black">SELECT SIZE</span>
              </Typography>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <Chip
                    key={size}
                    value={size}
                    onClick={() => handleSizeSelect(size)}
                    variant={selectedSize === size ? "filled" : "outlined"}
                    color={selectedSize === size ? "brown" : "gray"}
                    className="cursor-pointer hover:bg-brown-100"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <div className="flex flex-row justify-center items-center w-full ">
          {" "}
          <Button
            variant="filled"
            color="brown"
            onClick={() => {
              handleClose();
              handleAddToCart();
            }}
            className=" hover:bg-hoverColor"
            // disabled={!selectedSize}
          >
            Add to Cart
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default SingleProduct;