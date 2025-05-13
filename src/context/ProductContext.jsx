import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { CarIcon } from "lucide-react";

export const ProductContext = createContext();
const api_url = "https://depis3.vercel.app/api";

export const ProductProvider = ({ children }) => {
  const [signedUser, setSigneduser] = useState(null);
  const [products, setProducts] = useState([]);
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
    // const userId = JSON.parse(localStorage.getItem("id"));
    const userId = "681ff5af68095a9c8a226e78";
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

  useEffect(() => {
    getProducts();
     //  if (localStorage.getItem("id")) {
        getSigneduser();
        // }
  }, []);
  
  

  const addTocart = async (id) => {
    // const userId = "681ff5af68095a9c8a226e78";
    if (!ensureLoggedin()) return;
    const product = products.find((item) => item._id === id);
    if (!product) {
      console.error("product not found");
      return;
     }
     try {
      const response = await axios.post(`${api_url}/cart`, {
      productId: product._id,
      quantity: 1,
      userId,
      });    
       console.log(response.data.cartItems)
       const updatedCart = response.data.cartItems.map((item) => ({
         _id: item._id,
         quantity: item.quantity,
         product: item.productId
       }
));
       setCartitems(updatedCart);
         setLoading(false);

       toast(
      <div className="bg-white text-[#493628] px-4 py-2 rounded-md">
        🛒 Item added to cart!
      </div>,
      {
        autoClose: 1500,
      }
    );
     } catch (error){
        console.error("Error adding to cart:", error);
      }
  };

  const deleteFromcart = async(id) => {
    if (!ensureLoggedin()) return;
        // const userId = "681ff5af68095a9c8a226e78";

    //  const userId = JSON.parse(localStorage.getItem("id"));
    try {
       const response = await fetch(`${api_url}/cart`, {
      method: "DELETE",headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        productId: id,
        userId: userId,
      }),
       }).then((response) => response.json()).then((data) => {
      const updatedCart = data.cartItems.map((item) => ({
         _id: item._id,
         product: item.productId
      }))
      setCartitems(updatedCart);
      setLoading(false);
    });
     
  } catch (error) {
    console.error("Error deleting from cart:", error);
  }
  };

   const moveTowishlist = async(id) => {
     if (!ensureLoggedin()) return;
        //  const userId = "681ff5af68095a9c8a226e78";

    //  const userId = JSON.parse(localStorage.getItem("id"));
     try {
       await axios.delete(`${api_url}/cart`, {
         data: { productId: id, userId }
       })
       const response = await axios.post(`${api_url}/wishlist`,
         { userId, productId: id })
       
       setWishlistitems(response.data.wishlist);  
       const cart = await axios.get(`${api_url}/cart/${userId}`);
       setCartitems(cart.data.cartItems);
     }
     catch (error) {
           console.error("Error moving to wishlist:", error);

     }

  };

   const increaseQuantity =async (id) => {
     if (!ensureLoggedin()) return;
        //  const userId = "681ff5af68095a9c8a226e78";

    //  const userId = JSON.parse(localStorage.getItem("id"));
     const item = cartItems.find(item => item.productId._id === id);
     const itemQuantity = item ? item.quantity : 0;
     try {
       const response = await axios.patch(`${api_url}/cart/${userId}`, {
         productId: id,
         quantity: itemQuantity + 1 
       });
       console.log(response.data.cartItems)
       setCartitems(response.data.cartItems);
     }
     catch (error) {
       console.error("error increasing quantity:", error);
     }
  };

  const decreaseQuantity = async(id) => {
    
    if (!ensureLoggedin()) return;
        // const userId = "681ff5af68095a9c8a226e78";

    //  const userId = JSON.parse(localStorage.getItem("id"));
     const item = cartItems.find(item => item.productId._id === id);
     const itemQuantity = item ? item.quantity : 0;
     try {
       const response = await axios.patch(`${api_url}/cart/${userId}`, {
         productId: id,
         quantity: itemQuantity - 1 
       });
       if (itemQuantity < 1) {
         const filtered=  response.data.cartItems.filter(item => item.productId._id !== id);
         setCartitems(filtered);
       }
       setCartitems(response.data.cartItems);
     }
     catch (error) {
       console.error("error decreasing quantity:", error);
     }
  
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