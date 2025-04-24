import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from "./pages/Cart"
import ProductProvider from './context/ProductContext'
import Checkout from './pages/Checkout'

const App = () => {
  return (
    <div>
      <ProductProvider>
        <Routes>
             <Route path='/' element={<Cart />} />
           <Route path='/checkout' element={<Checkout />} />
       </Routes>
       </ProductProvider>
    </div>
  );
};

export default App;
