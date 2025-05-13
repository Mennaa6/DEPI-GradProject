import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ProductContext = createContext();
const api_url = "https://depis3.vercel.app/api";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [signedUser, setSigneduser] = useState(null);
  const [cartItems, setCartitems] = useState([]);
  const [wishlistItems, setWishlistitems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await axios.get(`${api_url}/products`);
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error("product fetch error:", error);
    }
  };

  //get single product
  const getSingleProduct = async (id) => {
    try {
      const response = await axios.get(`${api_url}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching single product:", error);
      throw error;
    }
  };

  //add new product
  const addProduct = async (productData) => {
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("subcategory", productData.subcategory);
      formData.append("image", productData.image);
      formData.append("stock", productData.stock);
      formData.append("available", productData.available);

      const response = await axios.post(`${api_url}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product created! successfully");
      getProducts();
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to create product.");
      throw error;
    }
  };

  //update product
  const updateProduct = async (id, updatedData) => {
    try {
      let payload;
      let headers = {};

      if (updatedData.image instanceof File) {
        // If the image is a File, use FormData
        payload = new FormData();
        payload.append("name", updatedData.name);
        payload.append("category", updatedData.category);
        payload.append("price", updatedData.price);
        payload.append("stock", updatedData.stock);
        payload.append("description", updatedData.description);
        payload.append("image", updatedData.image);

        headers["Content-Type"] = "multipart/form-data";
      } else {
        // Otherwise send as JSON
        payload = updatedData;
        headers["Content-Type"] = "application/json";
      }

      const response = await axios.patch(`${api_url}/products/${id}`, payload, {
        headers,
      });

      toast.success("Product updated!");
      getProducts();
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
      throw error;
    }
  };

  //delete a product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${api_url}/products/${id}`);
      toast.info("Product deleted successfully.");
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
      throw error;
    }
  };

  const getSigneduser = async () => {
    const userId = JSON.parse(localStorage.getItem("id"));
    try {
      const response = await axios.get(`${api_url}/users/${userId}`);
      setSigneduser(response.data.User);
      setCartitems(response.data.User.cartItems);
      setWishlistitems(response.data.User.wishlist);
      setLoading(false);
    } catch (error) {
      console.error("user fetch error:", error);
    }
  };

  useEffect(() => {
    getProducts();
    if (localStorage.getItem("id")) {
      getSigneduser();
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
      const response = await axios.patch(`${api_url}/users/${userId}`, {
        cartItems: updatedCart,
      });
      setSigneduser((prev) => ({ ...prev, ...response.data }));
      setCartitems(response.data.cartItems);
    } catch (error) {
      console.error("error updating cart:", error);
    }
  };

  const updateWishlistserver = async (updatedCart, updatedWishlist) => {
    try {
      const userId = JSON.parse(localStorage.getItem("id"));
      const response = await axios.patch(`${api_url}/users/${userId}`, {
        cartItems: updatedCart,
        wishlist: updatedWishlist,
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
        signedUser,
        loading,
        addTocart,
        deleteFromcart,
        increaseQuantity,
        decreaseQuantity,
        moveTowishlist,
        getSingleProduct,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
