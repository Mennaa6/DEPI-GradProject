import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext';

import { Button } from "@material-tailwind/react";


const OrderSummary = () => {
    const { cartItems }= useContext(ProductContext);
  return (
      <div>
          <h1>Order Summary</h1>
          {cartItems.map((item) => (
               <div>
               <img src={item.image} alt={item.title}/>
                  <p>{item.title}</p>
              
              <p >SubTotal: {item.price} EGP</p>
              <p>Shipping: </p>
              <p>Total: </p>
            <Button>Pay now</Button>
             </div>

          ))}
         
    </div>
  )
}

export default OrderSummary