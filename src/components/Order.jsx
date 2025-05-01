import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const Order = ({ order, payment }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://spotted-thankful-mambo.glitch.me/products")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = [...data.men, ...data.women, ...data.accessories];
        const userProducts = [];
        order.items.forEach((productId) => {
          let product = allProducts.find(
            (productItem) => productItem.id == productId
          );
          userProducts.push(product);
          setProducts(userProducts);
        });
      });
  }, []);

  function handleTotalPaid() {
    let totalPrice = 0;
    products.forEach(item => {
      totalPrice += Number(item.price);
    });
    return totalPrice;
  }

  return (
    <div className="border border-gray-400 flex flex-col justify-around w-[96%] rounded-lg p-3 gap-3 ml-4">
      {" "}
      <div className="w-[96%] flex justify-between">
        <div className="text-[0.8em] sm:text-sm">
          <p>
            Order ID: {order.id + " "}
            <span
              className={`${
                order.status == "pending" ? "text-red-700" : "text-green-500"
              } font-bold`}
            >
              {order.status}
            </span>
          </p>
          <p className="text-gray-600 text-xs">Date: {" " + order.date}</p>
        </div>
        {order.status !== "shipped" && (
          <Button
            variant="outlined"
            className="w-[30%] text-red-600 border-red-600 rounded-md text-[0.6em] p-0 sm:text-xs sm:w-[20%]  hover:text-[#FFF] hover:bg-red-500 hover:font-normal"
          >
            Cancel order
          </Button>
        )}
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
          <p> {order.address}</p>
        </div>
        <div className="bg-gray-500 h-[9em] sm:h-[7em] w-[0.1px]"></div>
        <div className="w-[32%]">
          <p>Payment</p>
          <p className="text-green-500">
            Visa **** **** **** {payment.slice(-5)}
          </p>
          <p>Shipping fee: 56EGP</p>
          <p>Total Paid: {handleTotalPaid()}</p>
        </div>
      </div>
      <hr className="w-[96%]" />
      <div className="grid grid-cols-3 text-[0.65em] gap-3 sm:text-[0.9em] text-gray-800">
        {products.map((item) => {
          return (
            <div className="w-[33%] flex justify-between gap-3">
              <img
                src= {item.thumbnail}
                alt="item Photo"
                className="h-[90%] w-[80%]"
              />
              <div>
                {" "}
                <p className="w-[200%]">{item.title}</p>
                <p className="w-[200%] font-bold">{item.price + " "}EGP</p>
              </div>
            </div>
          );
        })}
        
      </div>
    </div>
  );
};

export default Order;
