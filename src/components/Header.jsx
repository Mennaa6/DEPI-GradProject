import React from "react";
import logo from "../assets/logo2.png";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { FaCartShopping } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link

const Header = () => {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <Link to="/women" className="flex items-center">
          Women
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <Link to="/men" className="flex items-center">
          Men
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <Link to="/accessories" className="flex items-center">
          Accessories
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className="p-1 font-bold "
      >
        <Link to="/products" className="flex items-center">
          Products
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <img src={logo} alt="" />
        </div>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center gap-4 text-xl  ">
            <a href="/cart">
              {" "}
              <FaCartShopping />
            </a>
            <a href="">
              <MdFavorite />
            </a>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <a href="/cart">
            {""}
            <FaCartShopping />
          </a>
          <a href="">
            <MdFavorite />
          </a>
        </div>
      </MobileNav>
    </Navbar>
  );
};

export default Header;
