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
  const [users, setUsers] = useState([]);
  const [signedUser, setSignedUser] = useState(null);

  const navigate = useNavigate();

  //get all products
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
      return response.data.product;
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
      // Create a copy without the image field
      const { image, ...dataWithoutImage } = updatedData;

      const response = await axios.patch(
        `${api_url}/products/${id}`,
        dataWithoutImage,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
  //get all users for the dashboard
  const getUsers = async () => {
    try {
      const response = await axios.get(`${api_url}/users`);
      setUsers(response.data.Users);
      setLoading(false);
    } catch (error) {
      console.error("users fetch error:", error);
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
      // Create a copy without the image field
      const { image, ...dataWithoutImage } = updatedData;

      const response = await axios.patch(
        `${api_url}/users/${id}`,
        dataWithoutImage,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("User updated!");
      getProducts();
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.");
      throw error;
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${api_url}/users/${id}`);
      toast.info("User deleted successfully.");
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting User:", error);
      toast.error("Failed to delete User.");
      throw error;
    }
  };

  const getSingleUser = async (id) => {
    try {
      const response = await axios.get(`${api_url}/users/${id}`);
      return response.data.User;
    } catch (error) {
      console.error("Error fetching single product:", error);
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

  function getSignedUser() {
    const userId = JSON.parse(window.localStorage.getItem("user"))?.id;
    if (userId) {
      fetch(`${api_url}/users/${userId}`)
        .then((res) => res.json())
        .then((data) => setSignedUser(data.User));
    }
  }

  useEffect(() => {
    getProducts();
    getWishlist();
    getSignedUser();
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
        getUsers,
        users,
        updateUser,
        getSingleUser,
        deleteUser,
        signedUser,
        getSignedUser,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
