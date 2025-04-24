import coat1 from "../assets/coat1.jpg";
import mencoll from "../assets/mencoll.jpeg";
import acc_coll from "../assets/acc_coll.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Type = () => {
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
      id="category"
      className="w-full bg-main lg:px-20 px-5 pt-[100px] pb-[80px] flex lg:flex-row flex-col justify-center items-center border-t border-second"
    >
      <div className=" w-fill grid lg:grid-cols-3 grid-cols-1 justify-around items-center gap-20 ">
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="flex flex-col justify-center items-center gap-6 "
        >
          <img src={coat1} alt="" className="rounded-full " />
          <button className="bg-buttonColor hover:bg-hoverColor text-white hover:text-black lg:px-8 px-7 py-3 rounded-lg font-semibold  ">
            SHOP WOMEN
          </button>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="flex flex-col justify-center items-center gap-6"
        >
          <img src={mencoll} alt="" className="rounded-full " />
          <button className="bg-buttonColor hover:bg-hoverColor text-white hover:text-black lg:px-8 px-7 py-3 rounded-lg font-semibold  ">
            SHOP MEN
          </button>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="flex flex-col justify-center items-center gap-6"
        >
          <img src={acc_coll} alt="" className="rounded-full  " />
          <button className="bg-buttonColor hover:bg-hoverColor text-white hover:text-black lg:px-8 px-7 py-3 rounded-lg font-semibold  ">
            SHOP ACCESSORIES
          </button>
        </div>
      </div>
    </div>
  );
};

export default Type;
