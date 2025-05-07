import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({ men: [], women: [], accessories: [] });
  const [signedUser, setSigneduser] = useState(null);
  const [cartItems, setCartitems] = useState([]);
  const [wishlistItems, setWishlistitems] = useState([]);
  const navigate = useNavigate();

  const getProducts = () => {
    fetch("https://shared-dust-zoo.glitch.me/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("product fetch error:", error));
  };

  const getSigneduser = () => {
    const userId = JSON.parse(localStorage.getItem("id"));
    fetch(`https://shared-dust-zoo.glitch.me/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setSigneduser(data);
        setCartitems(data.cartItems);
        setWishlistitems(data.wishlist);
      })
      .catch((error) => console.error("user fetch error:", error));
  };

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      navigate("/login");
    } else {
      getProducts();
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

  const updateCartserver = (updatedCart) => {
    const userId = JSON.parse(localStorage.getItem("id"));
    fetch(`https://shared-dust-zoo.glitch.me/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems: updatedCart }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSigneduser((prev) => ({ ...prev, ...data }));
        setCartitems(data.cartItems || updatedCart);
      })
      .catch((err) => console.error("error updating cart:", err));
  };

  const updateWishlistserver = (updatedCart, updatedWishlist) => {
    const userId = JSON.parse(localStorage.getItem("id"));
    fetch(`https://shared-dust-zoo.glitch.me/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems: updatedCart,
        wishlist: updatedWishlist,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSigneduser((prev) => ({ ...prev, ...data }));
        setCartitems(data.cartItems || updatedCart);
        setWishlistitems(data.wishlist || updatedWishlist);
      })
      .catch((err) => console.error("error updating wishlist:", err));
  };

  const addTocart = (id) => {
    if (!ensureLoggedin()) return;
    let product = null;
    for (const cat in products) {
      product = products[cat].find((item) => item.id === id);
      if (product) break;
    }
    if (!product) return;

    const exists = cartItems.find((item) => item.id === id);
    const updatedCart = exists
      ? cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [
          ...cartItems,
          {
            id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1,
          },
        ];

    updateCartserver(updatedCart);
    toast(<div className="bg-white text-[#493628] px-4 py-2 rounded-md">🛒 Item added to cart!</div>, {
      autoClose: 1500,
    });
  };

  const deleteFromcart = (id) => {
    if (!ensureLoggedin()) return;
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCartserver(updatedCart);
  };

  const increaseQuantity = (id) => {
    if (!ensureLoggedin()) return;
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartserver(updatedCart);
  };

  const decreaseQuantity = (id) => {
    if (!ensureLoggedin()) return;
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;
    const updatedCart =
      item.quantity > 1
        ? cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        : cartItems.filter((item) => item.id !== id);

    updateCartserver(updatedCart);
  };

  const moveTowishlist = (id) => {
    if (!ensureLoggedin()) return;
    const product = cartItems.find((item) => item.id === id);
    if (!product) return;
    const updatedCart = cartItems.filter((item) => item.id !== id);
    const updatedWishlist = [...wishlistItems, product.id];
    updateWishlistserver(updatedCart, updatedWishlist);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        signedUser,
        cartItems,
        wishlistItems,
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

export default ProductProvider;
