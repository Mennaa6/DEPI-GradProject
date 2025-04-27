import { TfiWallet } from "react-icons/tfi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TbCreditCardRefund } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Services = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);

  return (
    <div className="w-full bg-main  py-[60px] border-t border-second">
      {/* Section Title */}
      <h2
        className="text-3xl font-bold text-center text-black mb-10"
        data-aos="fade-up"
      >
        OUR SERVICES
      </h2>

      {/* Services Grid */}
      <div className="lg:px-20 px-5 grid lg:grid-cols-4 grid-cols-1 justify-around items-center gap-10">
        <div
          data-aos="flip-left"
          data-aos-delay="200"
          className="flex flex-col justify-center items-center gap-2 shadow-md text-center rounded-xl p-2 bg-gray-200"
        >
          <LiaShippingFastSolid
            size={60}
            className="mb-[20px] text-brown-700 "
          />
          <h1 className="text-xl text-black font-semibold ">Fast Shipping</h1>
          <p className="text-[17px] text-gray-600">
            Enjoy fast and reliable delivery to your doorstep within 3 - 4 days.
          </p>
        </div>
        <div
          data-aos="flip-left"
          data-aos-delay="300"
          className="flex flex-col justify-center items-center gap-2 shadow-md text-center rounded-xl p-2 bg-gray-200"
        >
          <TfiWallet size={60} className="mb-[20px] text-brown-700" />
          <h1 className="text-xl text-black font-semibold">Secure Payments</h1>
          <p className="text-[17px] text-gray-600">
            100% safe payments whether you pay by card or cash on delivery.
          </p>
        </div>
        <div
          data-aos="flip-left"
          data-aos-delay="400"
          className="flex flex-col justify-center items-center gap-2 shadow-md text-center rounded-xl p-2 bg-gray-200"
        >
          <TbCreditCardRefund size={60} className="mb-[20px] text-brown-700" />
          <h1 className="text-xl text-black font-semibold">
            Returns and Refunds
          </h1>
          <p className="text-[17px] text-gray-600">
            Flexible return policy allows you to return items within 14 - 30
            days.
          </p>
        </div>
        <div
          data-aos="flip-left"
          data-aos-delay="500"
          className="flex flex-col justify-center items-center gap-2 shadow-md text-center rounded-xl p-2 bg-gray-200"
        >
          <RiCustomerService2Line
            size={60}
            className="mb-[20px] text-brown-700"
          />
          <h1 className="text-xl text-black font-semibold">Customer Service</h1>
          <p className="text-[17px] text-gray-600">
            Our support team is ready to assist you with any questions or
            issues.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
