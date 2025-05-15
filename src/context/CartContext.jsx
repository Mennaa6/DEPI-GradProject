import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
export const CartContext = createContext();
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const api_url = "https://depis3.vercel.app/api";

export const CartProvider = ({ children }) => {
    const [cartItems, setCartitems] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
   
  // function to get userid from local storage
   const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.id;
   };
    
  const fetchData = async () => {
    const userId = getUserId();
    if (!userId) return;
     try { 
        const response = await axios.get(`${api_url}/cart/${userId}`);
        setCartitems(response.data.cartItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items',error);
      } 
  }
  
  const deleteFromcart = async (id) => {
    const userId = getUserId();
   try {
    const response = await fetch(`${api_url}/cart`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: id,
        userId: userId,
      }),
    });
    const data = await response.json();
     setCartitems(data.cartItems);
     setLoading(true);
     await fetchData();
     setLoading(false);
  } catch (error) {
    console.error("Error deleting from cart:", error);
  }
};
  const moveTowishlist = async (id) => {
     const userId = getUserId();
  try {
      await fetch(`${api_url}/cart`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: id,
        userId: userId,
      }),
    });

     const response = await axios.post(`${api_url}/wishlist`, {
      userId,
      productId: id
    });

     const cart = await axios.get(`${api_url}/cart/${userId}`);
    setCartitems(cart.data.cartItems);
    setWishlist(response.data.wishlist);
    setLoading(true);
    await fetchData();
    setLoading(false);
  } catch (error) {
    console.error("Error moving to wishlist:", error);
  }
};

  const increaseQuantity = async (id) => {
     const userId = getUserId();
     const item = cartItems.find(item => item.productId._id === id);  
     const itemQuantity = item ? item.quantity : 0;

  try {
    const response = await axios.patch(`${api_url}/cart/${userId}`, {
      productId: id,
      quantity: itemQuantity + 1
    });

    setCartitems(response.data.cartItems);
    setLoading(true);
    await fetchData();
    setLoading(false);
  } catch (error) {
    console.error("Error increasing quantity:", error);
  }
};



  const decreaseQuantity = async (id) => {
     const userId = getUserId();
     const item = cartItems.find(item => item.productId._id === id);
     const itemQuantity = item ? item.quantity : 0;

  try {
    const response = await axios.patch(`${api_url}/cart/${userId}`, {
      productId: id,
      quantity: itemQuantity - 1
    });

    if (itemQuantity < 1) {
      const response = await fetch(`${api_url}/cart`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: id,
        userId: userId,
      }),
      })
        const data = await response.json(); 
      setCartitems(data.cartItems);
         setLoading(true);
         await fetchData();
         setLoading(false);

    }
    setCartitems(response.data.cartItems);
       fetchData();

  } catch (error) {
    console.error("Error decreasing quantity:", error);
  }
};



  useEffect(() => {
   if(getUserId()){
    fetchData();  
  }
}, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        deleteFromcart,
        moveTowishlist,
        increaseQuantity,
        decreaseQuantity,
        fetchData
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
 