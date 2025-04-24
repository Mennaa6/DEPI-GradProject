import { Carousel } from "@material-tailwind/react";
import MainBanner from "../assets/MainBanner.png";
import manbanner from "../assets/manbanner.png";
import accbanner from "../assets/accbanner.png";
const Banner = () => {
  return (
    <Carousel
      transition={{ duration: 1 }}
      autoplayDelay={3000}
      loop={true}
      autoplay={true}
      className="rounded-none"
    >
      <img
        src={MainBanner}
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src={manbanner}
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src={accbanner}
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
};

export default Banner;
