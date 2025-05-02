import React, { useState, useContext } from "react";
import { ProductContext } from '../context/ProductContext';
import { Button } from "@material-tailwind/react";
import {  FaCreditCard } from "react-icons/fa"; 
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems } = useContext(ProductContext);
  const [shippingDetails, setShippingdetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    governorate: "",
    zip: "",
  });
  const handleShippingChange = (key, value) => {
    setShippingdetails(prev => ({...prev, [key]: value }));
  };
  const [paymentDetails, setPaymentdetails] = useState({
    cardNumber: "",
    expDate: "",
    cvv: "",
  });
  const handlePaymentChange = (key, value) => {
    if (key === 'cardNumber') {
      value = value.replace(/\D/g, '').slice(0, 16);  // Allow only 16 digits
      value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    if (key === 'cvv') {
      // Allow only digits and limit to 3 digits
      value = value.replace(/\D/g, '').slice(0, 3);  // Allow only 3 digits
    }
    setPaymentdetails(prev => ({ ...prev, [key]: value }));
  }
  const deliveryFee = shippingDetails.governorate === "Mansoura" ? 80 : 50;
  
  return (
    <div className="bg-[#E4E0E1] p-8">
      <div className="max-w-4xl mx-auto bg-[#E4E0E1]  p-6 shadow-lg grounded-xl">
        <h1 className=" text-lg md:text-4xl font-bold mb-12 text-center text-[#493628]">CHECKOUT</h1>

        <div className="flex flex-col md:flex-row gap-8 mb-6">
          <div className=" w-auto md:w-2/3">
            <h2 className=" text-xl md:text-2xl font-semibold mb-4 ">Shipping Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={shippingDetails.name}
                required
                onChange={(e) =>  handleShippingChange('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                value={shippingDetails.email}
                required
                onChange={(e) =>  handleShippingChange('email', e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Address"
                value={shippingDetails.address}
                required
                onChange={(e) =>  handleShippingChange('address', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="City"
                value={shippingDetails.city}
                required
                onChange={(e) =>  handleShippingChange('city', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <select value={shippingDetails.governorate} onChange={(e) =>  handleShippingChange('governorate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-white">
                <option value="">Select State</option>
                <option value="Cairo">Cairo</option>
                <option value="Giza">Giza</option>
                <option value="Alexandria">Alexandria</option>
                <option value="Mansoura">Mansoura</option>
              </select>

              <input
                type="text"
                placeholder="ZIP Code"
                value={shippingDetails.zip}
                onChange={(e) => handleShippingChange('zip', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
 
              <div className="mt-4">
                <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 flex items-center">
                  <FaCreditCard className="mr-2"/>
                    Payment Information</h2>
            <div className="space-y-4">
              <input
                type="tel"
                placeholder="Card Number"
                value={paymentDetails.cardNumber}
                required
                onChange={(e) =>  handlePaymentChange('cardNumber', e.target.value) }
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="tel"
                placeholder="Expiration Date"
                value={paymentDetails.expDate}
                required
                onChange={ (e) =>  handlePaymentChange('expDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="tel"
                placeholder="CVV"
                value={paymentDetails.cvv}
                required
                    
                onChange={(e) =>  handlePaymentChange('cvv', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
 
              </div>
            </div>
          </div>

          <div className=" w-auto md:w-1/3 bg-[#D6C0B3] p-6 rounded-lg shadow-lg">
            <h2 className=" text-xl md:text-2xl font-bold mb-6   text-center ">Order Summary</h2>
            <div className="space-y-4">
              {
                cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                  <h2 className="w-[40%] text-sm ">{item.title}</h2>
                    <p className=" w-[30%] text-sm "> Quantity: {item.quantity}</p>
                    <p className="w-[30%] text-sm">{(item.price * item.quantity).toFixed(2)}  </p> 
                  </div>
                  
                )
                   
                  
                )
              }
              <div className="flex justify-between font-semibold mb-2">
                <p>Delivery</p>
                <p>{cartItems.length>0 ? deliveryFee.toFixed(2):0 }</p>
              </div>
              <hr className='my-3' />


            <div className="flex justify-between mt-4 font-semibold">
                <span>Total</span>
                <span>{(cartItems.reduce((total,item)=>total+(item.quantity*item.price) ,0)+deliveryFee).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex flex-col  mt-6">
              
              <Button className="bg-[#493628] hover:bg-[#AB886D] mb-4 w-full text-xs md:text-md rounded-lg ">Place Order</Button>
              <Link to="/cart"><Button className=" bg-[#493628] hover:bg-[#AB886D] w-full text-xs  md:text-md rounded-lg " >
              Return to Cart</Button></Link>
              </div>
              

            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;