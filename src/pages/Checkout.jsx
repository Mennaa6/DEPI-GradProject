import React from 'react'
import { ProductContext } from '../context/ProductContext';
import ContactForm from '../components/ContactForm'
import Shippingmethod from '../components/Shippingmethod'
import PaymentMethod from '../components/PaymentMethod';
import OrderSummary from '../components/OrderSummary';

const Checkout = () => {
  return (
    <div className=''>
      <ContactForm />
      <Shippingmethod />
      <PaymentMethod />
      <OrderSummary/>
       
           
    </div>
  )
}

export default Checkout;
