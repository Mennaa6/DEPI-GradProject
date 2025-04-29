import React, { createContext, useState ,useEffect} from 'react'
export const ProductContext = createContext();

 

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const getProducts = async () => { 
    try {
      const request = await fetch("https://shared-dust-zoo.glitch.me/products");
      const response = await request.json()
      setProducts(response);
    } catch (error)
    {
      console.error("product fetch error:", error);
    }
  }
  const getCartItems = async () => {
    try {
      const response = await fetch("https://shared-dust-zoo.glitch.me/cartItems");
      if (!response.ok) throw new Error("Failed to fetch cart");
      setCartItems(await response.json());
    } catch (error)
    {
      
        console.error("Cart fetch error:", error);
    }
  };
  const getWishlistitems = async () => {
    try{const response = await fetch(`https://shared-dust-zoo.glitch.me/wishlistItems`);
    setWishlistItems(await response.json());
  }catch (error)
    {
      
        console.error("wishlist fetch error:", error);
    }
  };
      useEffect(() => {
        getProducts();
        getCartItems;
        getWishlistitems;
      }, [])
      
  
  
  
  const addToCart = async (id) => {
    const product = products.find(item => item.id === id);
    if (!product) return;
    const exists = cartItems.find((item) => item.id === id);
    if (exists) {
      // Update quantity (PATCH)
      await fetch(`https://shared-dust-zoo.glitch.me/cartItems/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: exists.quantity + 1 }),
      });
    } else {
      // Add new item (POST)
      await fetch(`https://shared-dust-zoo.glitch.me/cartItems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, quantity: 1 }),
      });
    }
    getCartItems(); 
     
  }
    
         
  
  const deleteFromCart = async (id) => {
    await fetch(`https://shared-dust-zoo.glitch.me/cartItems/${id}`, { method: "DELETE" } );
    getCartItems();
    }   
  
const increaseQuantity = async (id) => {
  const item = cartItems.find((item) => item.id === id);
  await fetch(`https://shared-dust-zoo.glitch.me/cartItems/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity: item.quantity + 1 }),
  });
  getCartItems();
  }
  const decreaseQuantity = async (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item.quantity > 1) {
      await fetch(`https://shared-dust-zoo.glitch.me/cartItems/${id}`, {
         
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      });
       } else {
        await deleteFromCart(id); // Remove if quantity <= 0
    }
    getCartItems();
  }
  const moveTowishlist = async (id) => {
    const item = cartItems.find(item => item.id === id)
    if (!item) return;
    await fetch("https://shared-dust-zoo.glitch.me/wishlistItems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
      
    });
    await fetch(`https://shared-dust-zoo.glitch.me/cartItems/${id}`, { method: "DELETE" });
    getCartItems();
    getWishlistitems();
  }
   
  return (
      < ProductContext.Provider value={{ products,cartItems,setCartItems,addToCart ,deleteFromCart,increaseQuantity,decreaseQuantity,moveTowishlist}} >{children }</ProductContext.Provider>
  )
}
 
