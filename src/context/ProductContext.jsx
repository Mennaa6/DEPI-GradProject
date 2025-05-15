import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { CarIcon } from "lucide-react";

export const ProductContext = createContext();
const api_url = "https://depis3.vercel.app/api";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
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

  function getWishlist() {
    const userId = JSON.parse(window.localStorage.getItem("user"))?.id;
    if (userId) {
      fetch(`${api_url}/wishlist/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setWishlistItems(data.wishlist);
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    getProducts();
    getWishlist();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        wishlistItems,
        setWishlistItems,
        loading,
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
