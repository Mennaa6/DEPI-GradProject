import { Avatar } from "@material-tailwind/react";
import { MdEdit, MdLocationOn } from "react-icons/md";
import { Button } from "@material-tailwind/react";
const UserProfile = () => {
  return (
    <div className="flex justify-around">
      <div className="bg-[#E4E0E1] w-[90%] h-[100vh] flex flex-col justify-center rounded-lg border border-gray-300">
        <div className="flex flex-col gap-4 h-[90%]">
          <div className="flex justify-around">
            <div className="flex gap-3 w-[96%]">
              <Avatar
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="avatar"
                size="lg"
              />
              <div className="flex flex-col gap-1">
                <p>name name</p>
                <div className="flex justify-between w-[102%]">
                  <p>Email: mymail123@gmail.com, Phone: +20123456789</p>
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
          <div className="flex md:justify-around w-[96%]">
            <div className="md:grid md:grid-cols-2 sm:flex sm:flex-col sm:gap-4 w-[96%]">
              <div className="md:border border-gray-400 rounded md:h-[10vh] sm:text-sm w-[75%]">
                <MdLocationOn className="inline-flex" size={16} /> United
                States, 3601 Old Capitol Trall, Unit A-7, Suite
              </div>
              <div className="md:border border-gray-400 rounded md:h-[10vh] sm:text-sm w-[75%]">
                <MdLocationOn className="inline-flex" size={16} /> Moscow city,
                Street name, Building lenin, House 77
              </div>
            </div>
          </div>
          <div className="flex justify-around">
            <div className="w-[96%]">
              <Button
                variant="outlined"
                className="w-[33%] sm:text-[0.7em] md:w-[20%]"
              >
                + Add New Adress
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <hr className="w-[96%] border border-gray-200" />
          </div>
          {/* start */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
