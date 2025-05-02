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
import { ProductContext } from "../context/ProductContext";

const SingleProduct = ({ open, handleClose, product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = ["XS", "S", "M", "L", "XL"];

  if (!product) return null;

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
  const {  addTocart } = useContext(ProductContext);

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
          {product.title}
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
      <DialogBody divider className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 flex flex-col justify-between items-center ">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
          <div className="flex flex-row justify-between items-center gap-4 ">
            {" "}
            <Typography variant="h5" color="blue-gray">
              PRICE: ${product.price.toFixed(2)}
            </Typography>
            {product.discountPercentage > 0 && (
              <Typography color="red">
                {product.discountPercentage}% OFF
              </Typography>
            )}
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <Typography variant="paragraph" color="gray">
            <span className="text-black">DESCRIPTION: </span>
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
                    ? "text-yellow-500"
                    : "text-gray-400"
                }
              />
            ))}
            <Typography variant="small" color="blue-gray" className="ml-2">
              ({product.rating.toFixed(1)})
            </Typography>
          </div>
          <Typography variant="small" color="blue-gray">
            <span className="text-black"> BRAND:</span> {product.brand}
          </Typography>
          <Typography variant="small" color="blue-gray">
            <span className="text-black">DIM: </span>
            {product.dimensions.width}W x {product.dimensions.height}H x{" "}
            {product.dimensions.depth}D cm
          </Typography>
          <Typography variant="small" color="blue-gray">
            <span className="text-black"> CATEGORY: </span> {product.category}
          </Typography>

          <Typography
            variant="small"
            color={product.availabilityStatus === "In Stock" ? "green" : "red"}
          >
            <span className="text-black"> AVAILABLITY: </span>
            {product.availabilityStatus}
          </Typography>

          {/* Sizes Selection */}
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
        </div>
      </DialogBody>
      <DialogFooter>
        <div className="flex flex-row justify-center items-center w-full ">
          {" "}
          <Button
            variant="filled"
            color="brown"
            onClick={()=> {
              handleClose();
              addTocart(product.id);
             }
            }
            className=" hover:bg-hoverColor"
            disabled={!selectedSize}
          >
            Add to Cart
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default SingleProduct;
