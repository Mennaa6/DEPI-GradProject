import React from 'react'

const Shippingmethod = () => {
  return (
      <div className='form-section'>
          <h1>Shipping Method</h1>
          <label>
              <input type="radio" name='shipping' value="Cairo"/>Cairo - EGP50
          </label>
          <label>
              <input type="radio" name='shipping' value="Other"/>Other Governorates - EGP80
          </label>
    </div>
  )
}

export default Shippingmethod