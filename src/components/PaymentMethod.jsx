import React from 'react'

const PaymentMethod = () => {
  return (
      <div>
          <h1>Payment</h1>
          <label>
              <input type="radio" name='payment' />Debit/Credit Cards
          </label>
          <label>
              <input type="radio" name='payment'/>Cash On Delivery
          </label>
    </div>
  )
}

export default PaymentMethod