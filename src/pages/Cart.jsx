import React, { useContext} from 'react'
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from "@material-tailwind/react";
import { CartContext } from '../context/CartContext';

const Cart = () => { 
   const {
    cartItems,
    loading,
    deleteFromcart,
    moveTowishlist,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext);
  const navigate = useNavigate();
  const proceedTocheckout = () => {
    if (cartItems.length === 0)
    {
     toast(
      <div className="bg-white text-[#493628] px-4 py-2 rounded-md">🛒 Your cart is empty!</div>,{autoClose: 1000})
      return;
    }
      navigate('/checkout');
  }
  const proceedTodeliTerms = () => {
       navigate('/deliveryterms')
  }
   if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Spinner color="brown" className="h-16 w-16" />
        </div>
      );
    }
  return (
  <div className='min-h-screen bg-[#E4E0E1] px-4 py-6'>
   <div className='flex flex-col lg:flex-row gap-6'>
    <div className='w-full lg:w-2/3 bg-white shadow-lg p-6 rounded-md'>
      <h1 className='text-xl md:text-2xl font-bold mb-4'>YOUR CART</h1>
      {cartItems.length === 0 ? (<p className='italic text-center'>Your cart is empty</p>) : (
            cartItems.map((item) => (
              <div key={item.productId._id} className='flex flex-col md:flex-row gap-4 mb-6 border-b pb-4'>
                <img src={ item.productId.image} alt={item.productId.name} className="w-32 h-32 object-contain" />
                <div className='flex-1'>
                  <h2 className='font-semibold text-lg'>{item.productId.name}</h2>
                  <p className='text-sm text-gray-600'>Category: {item.productId.category}</p>
                  <div className='flex gap-3 text-xs mt-3'>
                    <button className='underline text-red-600' onClick={() => deleteFromcart(item.productId._id)}>Delete</button>
                    <button className='underline' onClick={() => moveTowishlist(item.productId._id)}>
                      Move to Wishlist</button>
                  </div>
                </div>
                <div className='flex items-start gap-4 mt-2 md:mt-0'>
                  <div className='border bg-white flex items-center gap-4 px-2 py-1 rounded-md'>
                    <button className='px-2' onClick={() => increaseQuantity(item.productId._id)}>+</button>
                    <span>{item.quantity}</span>
                    <button className='px-2' onClick={() => decreaseQuantity(item.productId._id)}>-</button>
                  </div>
                  <p className='font-semibold'>{item.productId.price} EGP</p>
                </div>
              </div>
            ))
      )}
      <Button className='mt-4 w-full md:w-auto bg-[#493628] hover:bg-[#AB886D] text-white' onClick={proceedTocheckout}>Proceed to Checkout</Button>
    </div>

    <div className='w-full lg:w-1/3 bg-[#D6C0B3] shadow-md p-6 rounded-md'>
      <h2 className='text-lg md:text-3xl font-bold text-black p-2 mb-4 text-center'>CHECKOUT</h2>
      <p className='text-center text-sm mb-4'>By placing your order, you agree to the <button className='text-blue-600 underline' onClick={proceedTodeliTerms}>Delivery Terms</button></p>

      <h3 className='font-bold text-lg mb-2'>ORDER SUMMARY:</h3>
      <div className='bg-white p-4 rounded-md shadow'>
        <p className='flex justify-between mb-2'><span>Sub Total</span><span>{cartItems.reduce((total,item)=>total+(item.productId.price * item.quantity) ,0).toFixed(2)} EGP</span></p>
        <hr className='my-3' />
         <Button className='w-full mt-4 bg-[#493628] hover:bg-[#AB886D]' Link  to="/checkout"onClick={proceedTocheckout}>Checkout</Button>
      </div>
    </div>
  </div>
</div>

        
  )
}

export default Cart
