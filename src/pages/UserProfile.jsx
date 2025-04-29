import { Avatar,Button } from "@material-tailwind/react";
import { MdEdit, MdLocationOn } from "react-icons/md";
import Order from "../components/Order"

const UserProfile = () => {
  return (
    <div className="flex justify-around">
      <div className="bg-[#E4E0E1] w-[90%]  flex flex-col justify-center rounded-lg border border-gray-600 h-fit pt-6 pb-6">
        <div className="flex flex-col gap-4 h-[90%]">
          <div className="flex justify-around">
            <div className="flex gap-3 w-[96%] text-[0.9em]">
              <Avatar
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="avatar"
                size="lg"
              />
              <div className="flex flex-col gap-1">
                <p>name name</p>
                <div className="flex justify-between w-[102%]">
                  <p>Email: mymail123@gmail.com, Phone: +201231500789</p>
                  <MdEdit
                    size={18}
                    className="cursor-pointer"
                    title="Edit"
                    style={{ color: "#493628" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <hr className="w-[96%] border border-gray-200" />
          </div>
          <div className="flex md:justify-around w-[96%] text-[0.85em]">
            <div className="sm:grid sm:grid-cols-2 flex flex-col gap-4 w-[96%]">
              <div className="md:border border-gray-400 rounded p-1 sm:text-sm w-[75%] cursor-pointer">
                <MdLocationOn className="inline-flex" size={16} /> United
                States, 3601 Old Capitol Trall, Unit A-7, Suite
              </div>
              <div className="md:border border-gray-400 rounded p-1 sm:text-sm w-[75%] cursor-pointer">
                <MdLocationOn className="inline-flex" size={16} /> Moscow city,
                Street name, Building lenin, House 77
              </div>
            </div>
          </div>
          <div className="flex justify-around">
            <div className="w-[96%]">
              <Button
                variant="outlined"
                className="w-[33%] text-[0.65em] sm:w-[18%] p-2 border-gray-500"
              >
                + Add New Adress
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <hr className="w-[96%] border border-gray-200" />
          </div>


          <p className="ml-6">Your Orders</p>
          
          <div className="flex flex-col gap-5">

            <Order/>
            
            <div className="border border-gray-400 flex flex-col justify-around w-[96%] rounded-lg p-3 gap-3 ml-4">
              {" "}
              <div className="w-[96%] flex justify-between">
                <div className="text-[0.8em] sm:text-sm">
                  <p>
                    Order ID: 8929{" "}
                    <span className="text-red-400">Pending</span>
                  </p>
                  <p className="text-gray-600 text-xs">
                    Date: 16 December 2024
                  </p>
                </div>
                <Button
                  variant="outlined"
                  className="w-[30%] text-red-600 border-red-600 rounded-md text-[0.6em] p-0 sm:text-xs sm:w-[20%] hover:text-[#FFF] hover:bg-red-500 hover:font-normal"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
