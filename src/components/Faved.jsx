import { Button } from "@material-tailwind/react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useState } from "react";

const Faved = ({ loc }) => {
  const [isFav, setIsFav] = useState(true);
  const [carted, setCarted] = useState(false);

  return (
    <div className="flex flex-col relative gap-1 w-[90%] select-none">
      <div className="flex justify-center w-full h-[60%] ">
        <div className="w-full h-full overflow-hidden">
          <img
            src={loc}
            alt="Shirt photo"
            className="rounded-lg shadow-lg w-full h-fit"
          />
          {isFav ? (
            <IoIosHeart
              className="absolute top-4 right-2 cursor-pointer text-[#D6C0B3] hover:text-[#AB886D]"
              size={25}
              onClick={() => {
                setIsFav(!isFav);
              }}
            />
          ) : (
            <IoIosHeartEmpty
              className="absolute top-4 right-2 cursor-pointer text-[#D6C0B3] hover:text-[#AB886D]"
              size={25}
              onClick={() => {
                setIsFav(!isFav);
              }}
            />
          )}
        </div>
      </div>
      <h1 className="font-bold text-center">Premium Product</h1>
      <p className="text-gray-500 text-center lg:text-[0.85em] sm:text-[0.7em]">
        Very good Product please buy this so that I can feed my children
      </p>
      <h1 className="font-bold text-center text-[0.9em]">250EPG</h1>
      <Button
        className="bg-[#D6C0B3] text-[#4B3621] hover:bg-[#AB886D]"
        onClick={() => {
          setCarted(true);
        }}
        disabled={carted}
      >
        <div className="flex justify-center gap-2 sm:text-[0.75em] lg:text-[1em] text-[1.2em]">
          {carted ? (
            <IoCheckmarkDoneSharp size={16} />
          ) : (
            <FaCartArrowDown size={16} />
          )}
          {carted ? "added to cart" : "add to cart"}
        </div>
      </Button>
    </div>
  );
};

export default Faved;
