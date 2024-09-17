import React from 'react';
import './Footer.css';


function Footer() {
  return (
    <div className='footer'>
      <div className='containt'>
        <div className='item'>
            <i className="fa fa-house"></i> Novi Pazar, Serbia 
        </div>
        <div className='item'>
            <i className="fa-solid fa-phone"></i> +381 613000896
        </div>
        <div>
            <i className="fa-solid fa-envelope"></i> agrishop@gmail.com
        </div>
      </div>
      <div>
        © 2024 AgriShop
      </div>
    </div>
  )
}

export default Footer
