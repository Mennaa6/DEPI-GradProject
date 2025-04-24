
import { FaSquareFacebook } from "react-icons/fa6";

import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

import { BiLogoGmail } from "react-icons/bi";

import { LiaCcVisa } from "react-icons/lia";

import { TbBrandMastercard } from "react-icons/tb";
import { LiaCcApplePay } from "react-icons/lia";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);

  return (
    <div
      id="contact "
      className="w-full flex flex-col justify-center items-center "
    >
      <div className="w-full bg-buttonColor lg:px-20 px-5 py-[40px] grid lg:grid-cols-[auto,auto,auto] grid-cols-2 justify-between items-start lg:gap-3 gap-10">
        <div
          data-aos="fade-right"
          data-aos-delay="200"
          className="flex flex-col justify-center items-start gap-10 grow"
        >
          <div className="flex flex-col justify-center items-start gap-4">
            <img src={logo} alt="" />
            <p className="text-gray-500 text-justify">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
              accusamus consequatur eaque ex at aperiam modi! Et vel saepe
              praesentium, rerum placeat pariatur quibusdam, eligendi sint
              repellendus esse impedit eveniet?
            </p>
          </div>
          <div className="flex flex-col justify-center items-start gap-4">
            <h1 className="text-black text-xl font-semibold "> OUR SOCIALS</h1>
            <div className="flex justify-center items-center gap-4">
              <FaSquareFacebook
                size={30}
                className="text-white hover:text-blue-700"
              />

              <FaInstagram
                size={31}
                className="text-white hover:text-pink-300"
              />

              <FaWhatsapp
                size={31}
                className="text-white hover:text-green-500"
              />

              <BiLogoGmail
                size={31}
                className="text-white hover:text-red-800"
              />
            </div>
          </div>
        </div>
        <div
          data-aos="fade-right"
          data-aos-delay="300"
          className="flex flex-col justify-center items-center ml-10"
        >
          <h1 className=" text-black text-xl font-semibold "> USEFUL LINKS</h1>
          <ul className="mt-5 flex flex-col  gap-2">
            <li className="text-gray-500 cursor-pointer hover:text-hoverColor underline">
              Home Page
            </li>

            <li className="text-gray-500 cursor- underline cursor-pointer hover:text-hoverColor">
              Shop Women
            </li>
            <li className="text-gray-500 cursor- underline cursor-pointer hover:text-hoverColor">
              Shop Men
            </li>
            <li className="text-gray-500 cursor- underline cursor-pointer hover:text-hoverColor">
              Shop Accessories
            </li>
            <li className="text-gray-500 cursor- underline cursor-pointer hover:text-hoverColor">
              Bestsellers
            </li>
            <li className="text-gray-500 cursor- underline cursor-pointer hover:text-hoverColor">
              Our Services
            </li>
          </ul>
        </div>
        <div
          data-aos="fade-right"
          data-aos-delay="400"
          className="flex flex-col justify-center items-start ml-10"
        >
          <h1 className=" text-black text-xl font-semibold mb-5">
            PRIVACY POLICY
          </h1>
          <div className="flex flex-col justify-center items-start gap-4">
            <p className="text-gray-500 text-justify">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
              accusamus consequatur eaque ex at aperiam modi! Et vel saepe
              praesentium, rerum placeat pariatur quibusdam, eligendi sint
              repellendus esse impedit eveniet
            </p>

            <h1 className=" text-black text-xl font-semibold mt-5">
              PAYMENT METHODS
            </h1>
            <div className="flex justify-center items-center gap-4">
              <LiaCcVisa size={40} className="text-white " />
              <TbBrandMastercard size={40} className="text-white " />
              <LiaCcApplePay size={40} className="text-white " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

