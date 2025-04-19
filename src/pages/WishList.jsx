import Faved from "../components/Faved";
import { Button } from "@material-tailwind/react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";
const WishList = () => {
  return (
    <div className=" sm:grid sm:grid-cols-3 md:grid-cols-4 p-5 sm:gap-5 m-3 sm:gap-y-8 flex flex-col gap-8 sm:text-[0.8em]">
      <Faved />
      <Faved />
      <Faved />
      <Faved />
      <Faved />
      <Faved />
      <div className="flex flex-col relative gap-1 w-[90%]">
        <div className="flex justify-center w-full h-full">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ45McUrJh8cAz5mqEz--GDKCKnL9rUUvtr8w&s"
            alt="Shirt photo"
            className="w-[80%] h-[80%]"
          />
        </div>
        <h1 className="font-bold text-center">Blue Shirt</h1>
        <p className="text-gray-500 text-center text-[0.85em]">
          Very good shirt please buy this so that I can feed my children
        </p>
        <h1 className="font-bold text-center text-[0.9em]">250EPG</h1>
        <Button className="bg-[#D6C0B3]">
          <div className="flex justify-center gap-2">
            <FaCartArrowDown size={16} /> add to cart
          </div>
        </Button>
        <IoIosHeart
          className="absolute top-1 right-1 cursor-pointer text-[#D6C0B3]"
          size={22}
        />
      </div>

      <div className="flex flex-col relative gap-1 w-[90%]">
        <div className="flex justify-center w-full h-full">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzfc4w7t82A7R2AJWs8awgDE5hPqIJ57gtlA&s"
            alt="Shirt photo"
            className="w-[80%] h-[80%]"
          />
        </div>
        <h1 className="font-bold text-center">Blue Shirt</h1>
        <p className="text-gray-500 text-center text-[0.85em]">
          Very good shirt please buy this so that I can feed my children
        </p>
        <h1 className="font-bold text-center text-[0.9em]">250EPG</h1>
        <Button className="bg-[#D6C0B3]" dis>
          <div className="flex justify-center gap-2">
            <FaCartArrowDown size={16} /> add to cart
          </div>
        </Button>
        <IoIosHeart
          className="absolute top-1 right-1 cursor-pointer text-[#D6C0B3]"
          size={22}
        />
      </div>
      <Faved />
      <Faved />
    </div>
  );
};

export default WishList;
