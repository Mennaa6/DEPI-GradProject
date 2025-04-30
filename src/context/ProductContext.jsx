import React, { createContext, useState ,useEffect} from 'react'
export const ProductContext = createContext();
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({ men: [], women: [], accessories: [] });
   
  const [signedUser, setSigneduser] = useState(null);
  const [cartItems, setCartitems] = useState([]);
  const [wishlistItems, setWishlistitems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  // ---------------------------------
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
  
  const getSigneduser = async () => {
    const userstr = localStorage.getItem("id");
      if (!userstr){ 
        navigate("/login");
        return;
      }
      try{
       const user = JSON.parse(userstr)
      const request = await fetch(`https://shared-dust-zoo.glitch.me/users/${user.id}`);
       const response = await request.json();
       setSigneduser(response);
      setCartitems(response.cartItems);
      setWishlistitems(response.wishlist);
   
     } catch (error)
     {
        console.error("User fetch error:", error);
        navigate("/login");
     }
     
   }
   useEffect(() => {
    getProducts();
    getSigneduser();
   }, []);
  // --------------------------
  const ensureLoggedin = () => {
    if (!signedUser) {
      toast(
        <div className="bg-yellow-100 text-brown-800 px-4 py-2 rounded-md  ">
          ⚠️ Please log in to continue.
        </div>
      );
      navigate("/login" , { state: { from: location.pathname } });
      return false;
    }
    return true;
  };
    
  const updateCartserver = async (updatedCart) => {
    if (!signedUser) return;
    const request = await fetch(`https://shared-dust-zoo.glitch.me/users/${signedUser.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems: updatedCart })
    });
    const response = await response.json();
    setCartitems(updatedCart);
    setWishlistitems(response);
   }
  
  
  const addTocart = async (id) => {
    if (!ensureLoggedin()) return;
    const exists = cartItems.find(item => item.id === id);
    let updatedCart;
    if (exists) {
      updatedCart = cartItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    } else {
      updatedCart = [...cartItems, { id, quantity: 1 }]
    }
    await updateCartserver(updatedCart);
    toast(
      <div className="bg-white text-[#493628] px-4 py-2 rounded-md">
        🛒 Item added to cart!
      </div>)
    
     
  }    
  
   const deleteFromcart = async (id) => {
     if (!ensureLoggedin()) return;
     const updatedCart = cartItems.filter(item => item.id !== id);
     await updateCartserver(updatedCart);
      
    }   
  
   const increaseQuantity = async (id) => {
    if (!ensureLoggedin()) return;
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    await updateCartserver(updatedCart);
  }
   const decreaseQuantity = async (id) => {
     if (!ensureLoggedin()) return;
     const item = cartItems.find((item) => item.id === id);
     if (!item) return;
     let updatedCart;
    if (item.quantity > 1) {
     updatedCart =cartItems.map((item => 
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      ))
    } else {
      updatedCart = cartItems.filter(item => item.id !== id);
     }
     await updateCartserver(updatedCart);
  }
  const moveTowishlist = async (id) => {
    if (!ensureLoggedin()) return;
    const product = cartItems.find(item => item.id === id);
    if (!product) return;
     const updatedCart = cartItems.filter(item => item.id !== id);
    const updatedWishlist = [...wishlist, product];
    setCartitems(updatedCart);
    setWishlistitems(updatedWishlist);
  
     const response = await fetch(`https://shared-dust-zoo.glitch.me/users/${signedUser.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        cartItems: updatedCart,
        wishlist: updatedWishlist
      })
     });
     const updatedUser = await response.json();
     setSigneduser(updatedUser);
    
  }
   
  return (
      < ProductContext.Provider value={{ products,signedUser,cartItems,  wishlistItems,setCartitems,addTocart ,deleteFromcart,increaseQuantity,decreaseQuantity,moveTowishlist}} >{children }</ProductContext.Provider>
  )
}
 