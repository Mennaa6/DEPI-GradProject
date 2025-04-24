import React, { createContext, useState ,useEffect} from 'react'
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
     const getProducts = async () => { 
        const request = await fetch('https://fakestoreapi.com/products');
        const response = await request.json()
        setProducts(response);
        console.log(response)
      }
      useEffect(() => {
        getProducts()
      }, [])
  useEffect(() => {
    const dataCart = window.localStorage.getItem('cartItems');
    if (dataCart != null) setCartItems(JSON.parse(dataCart));
  }, []);
      useEffect(() => {
       window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }, [cartItems]);
  
  
  
  const addToCart = (id) => {
    const product = products.find(item => item.id === id);
    if (!product) return;
    setCartItems((products) => {
      const exists = products.find(item => item.id === id)
      if (exists) {
        return products.map(product =>
          product.id === id ? { ...product, quantity: product.quantity + 1 } : product
        );
      } else {
        return [...products, { ...product, quantity: 1 }];
      };
    });
  }
    
         
  
  const deleteFromCart = (id) => {
    setCartItems(products => products.filter(item => item.id !== id));
   
  }
  const increaseQuantity = (id) => {
    setCartItems(products => products.map(product => product.id === id ? { ...product, quantity: product.quantity + 1 } : product));
  }
  const decreaseQuantity = (id) => { 
    setCartItems(products => products.map(product => product.id === id ? { ...product, quantity: product.quantity - 1 } : product).filter(product => product.quantity > 0));

  }
   
  return (
      < ProductContext.Provider  value={{ products,cartItems,addToCart ,deleteFromCart,increaseQuantity,decreaseQuantity}} >{children }</ProductContext.Provider>
  )
}

export default ProductProvider;