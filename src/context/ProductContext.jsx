import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [signedUser, setSigneduser] = useState(null);
  const [cartItems, setCartitems] = useState([]);
  const [wishlistItems, setWishlistitems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

   const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data.products);
     } catch (error) {
      console.error("product fetch error:", error);
    }
  };

   const getSigneduser = async () => {
    const userId = JSON.parse(localStorage.getItem("id"));
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
      setSigneduser(response.data.User);
      setCartitems(response.data.User.cartItems);
      setWishlistitems(response.data.User.wishlist);
     } catch (error) {
      console.error("user fetch error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getProducts();
        if (localStorage.getItem("id")) {
          await getSigneduser();
        }
      } catch (error) {
        console.error(error);
        
      } finally {
        setLoading(false);
      }
     
    }
    
  }, []);

   const ensureLoggedin = () => {
    if (!signedUser) {
      toast(
        <div className="bg-yellow-100 text-brown-800 px-4 py-2 rounded-md">
          ⚠️ Please log in to continue.
        </div>
      );
      navigate("/login");
      return false;
    }
    return true;
  };

   const updateCartserver = async (updatedCart) => {
    try {
      const userId = JSON.parse(localStorage.getItem("id"));
      const response = await axios.patch(`http://localhost:3000/api/users/${userId}`, { cartItems: updatedCart });
      setSigneduser((prev) => ({ ...prev, ...response.data }));
      setCartitems(response.data.cartItems);
    } catch (error) {
      console.error("error updating cart:", error);
    }
  };

   const updateWishlistserver = async (updatedCart, updatedWishlist) => {
    try {
      const userId = JSON.parse(localStorage.getItem("id"));
      const response = await axios.patch(`http://localhost:3000/api/users/${userId}`, {
        cartItems: updatedCart,
        wishlist: updatedWishlist
      });
      setSigneduser((prev) => ({ ...prev, ...response.data }));
      setCartitems(response.data.cartItems);
      setWishlistitems(response.data.wishlist);
    } catch (error) {
      console.error("error updating wishlist:", error);
    }
  };

   const addTocart = (id) => {
    if (!ensureLoggedin()) return;
    const product = products.find((item) => item._id === id);
    if (!product) {
      console.error("product not found");
      return;
    }
    const exists = cartItems.find((item) => item._id === id);
    let updatedCart = null;
    if (exists) {
      updatedCart = cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [
        ...cartItems,
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    }
    updateCartserver(updatedCart);
    toast(
      <div className="bg-white text-[#493628] px-4 py-2 rounded-md">
        🛒 Item added to cart!
      </div>,
      {
        autoClose: 1500,
      }
    );
  };
  const deleteFromcart = (id) => {
    if (!ensureLoggedin()) return;
    const updatedCart = cartItems.filter((item) => item._id !== id);
    updateCartserver(updatedCart);
  };

   const moveTowishlist = (id) => {
    if (!ensureLoggedin()) return;
    const product = cartItems.find((item) => item._id === id);
    if (!product) return;
    const updatedCart = cartItems.filter((item) => item._id !== id);
    const updatedWishlist = [...wishlistItems, product._id];
    updateWishlistserver(updatedCart, updatedWishlist);
  };

   const increaseQuantity = (id) => {
    if (!ensureLoggedin()) return;
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartserver(updatedCart);
  };

  const decreaseQuantity = (id) => {
    if (!ensureLoggedin()) return;
    const item = cartItems.find((item) => item._id === id);
    if (!item) return;
    let updatedCart;
    if (item.quantity > 1) {
      updatedCart = cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    } else {
      updatedCart = cartItems.filter((item) => item._id !== id);
    }
    updateCartserver(updatedCart);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        cartItems,
        wishlistItems,
        loading,
        addTocart,
        deleteFromcart,
        increaseQuantity,
        decreaseQuantity,
        moveTowishlist,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
