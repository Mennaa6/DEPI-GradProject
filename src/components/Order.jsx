import { Button } from "@material-tailwind/react";

const Order = () => {
  return (
    <div className="border border-gray-400 flex flex-col justify-around w-[96%] rounded-lg p-3 gap-3 ml-4">
      {" "}
      <div className="w-[96%] flex justify-between">
        <div className="text-[0.8em] sm:text-sm">
          <p>
            Order ID: 8929{" "}
            <span className="text-green-500 font-bold">Shipped</span>
          </p>
          <p className="text-gray-600 text-xs">Date: 16 December 2024</p>
        </div>
        <Button
          variant="outlined"
          className="w-[30%] text-red-600 border-red-600 rounded-md text-[0.6em] p-0 sm:text-xs sm:w-[20%]  hover:text-[#FFF] hover:bg-red-500 hover:font-normal"
        >
          Cancel order
        </Button>
      </div>
      <hr className="w-[96%]" />
      <div className="flex justify-around text-gray-800 text-[0.8em] sm:text-[0.9em]">
        <div className="w-[32%]">
          <p>Contact</p>
          <p>Mike Johnatan</p>
          <p>Phone: +201231500789</p>
          <p>Email: info@mail.com</p>
        </div>
        <div className="bg-gray-500 h-[9em] sm:h-[7em] w-[0.1px]"></div>
        <div className="w-[32%]">
          <p>Shipping address</p>
          <p> United States, 3601 Old Capitol Trall, Unit A-7, Suite</p>
        </div>
        <div className="bg-gray-500 h-[9em] sm:h-[7em] w-[0.1px]"></div>
        <div className="w-[32%]">
          <p>Payment</p>
          <p className="text-green-500">Visa **** 4261</p>
          <p>Shipping fee: 56EGP</p>
          <p>Total Paid: 1556EGP</p>
        </div>
      </div>
      <hr className="w-[96%]" />
      <div className="grid grid-cols-3 text-[0.65em] gap-3 sm:text-[0.9em] text-gray-800">
        <div className="w-[33%] flex justify-between gap-3">
          <img
            src="https://m.media-amazon.com/images/I/41S+9swCRBL._AC_SX342_SY445_.jpg"
            alt="item Photo"
            className="h-[90%] w-[80%]"
          />
          <div>
            {" "}
            <p className="w-[200%]">T-shirt with multiple colors</p>
            <p className="w-[200%] font-bold"> 2x = 500EGP</p>
          </div>
        </div>

        <div className="w-[33%] flex justify-between gap-3">
          <img
            src="https://m.media-amazon.com/images/I/41S+9swCRBL._AC_SX342_SY445_.jpg"
            alt="item Photo"
            className="h-[90%] w-[80%]"
          />
          <div>
            {" "}
            <p className="w-[200%]">T-shirt with multiple colors</p>
            <p className="w-[200%] font-bold"> 2x = 500EGP</p>
          </div>
        </div>

        <div className="w-[33%] flex justify-between gap-3">
          <img
            src="https://m.media-amazon.com/images/I/41S+9swCRBL._AC_SX342_SY445_.jpg"
            alt="item Photo"
            className="h-[90%] w-[80%]"
          />
          <div>
            {" "}
            <p className="w-[200%]">T-shirt with multiple colors</p>
            <p className="w-[200%] font-bold"> 2x = 500EGP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
