import React from 'react'

const ContactForm = () => {
  return (
      <form className='form-section'>
          <h1>Contact</h1>
          <input type="email" placeholder='Email' />
          <label >
              <input type="checkbox" />Email me with news and offers
          </label>
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name' />
          <input type="text" placeholder='Address' />
          <input type="text" placeholder='Apartment,suite,etc.' />
          <input type="text" placeholder='City' />
          <select id='governorate' >
              <option value="">Select Governorate</option>
              <option value="Cairo">Cairo</option>
              <option value="Alexandria">Alexandria</option>
              <option value="Gharbia">Gharbia</option>
              <option value="Giza">Giza</option>
               <option value="Aswan">Aswan</option>
              <option value="Other">Other</option>
          </select>
          <input type="text" placeholder='Postal code' />
          <input type="text" placeholder='Phone' />
          <label >
              <input type="checkbox" />Save this information for next time
          </label>
   </form>
  )
}

export default ContactForm