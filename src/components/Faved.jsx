import { Button } from "@material-tailwind/react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";

const Faved = () => {
  return (
    <div className="flex flex-col relative gap-1 w-[90%]">
      <div className="flex justify-center w-full h-full">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRegcVg-Bxygrbn7fWAITufmDfcCPY31zTEyQ&s"
          alt="Shirt photo"
          className="w-[80%] h-[80%]"
        />
      </div>
      <h1 className="font-bold text-center">Blue Shirt</h1>
      <p className="text-gray-500 text-center lg:text-[0.85em] sm:text-[0.7em]">
        Very good blue shirt please buy this so that I can feed my children
      </p>
      <h1 className="font-bold text-center text-[0.9em]">250EPG</h1>
      <Button className="bg-[#D6C0B3]">
        <div className="flex justify-center gap-2 sm:text-[0.75em] lg:text-[1em] text-[1.2em]">
          <FaCartArrowDown size={16} /> add to cart
        </div>
      </Button>
      <IoIosHeart
        className="absolute top-1 right-1 cursor-pointer text-[#D6C0B3]"
        size={22}
      />
    </div>
  );
};

export default Faved;
