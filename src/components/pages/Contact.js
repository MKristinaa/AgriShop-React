import React, { useEffect, useState } from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; 

function Contact() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = Cookies.get('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) { 
          setUser(parsedUser);
        } else {
          console.error('No user ID found in stored user data.');
        }
      }
    };

    fetchUserData();
  },[])

  return (
    <div className='container'>
      {/* CART */}
      {(user === null || user.role === 'seller' || user.role === 'user' ) && (
          <li className='nav-item'>
              <div className='cart'>
                <Link to='/cart' className='linkkkk'>
                    <i className="fa-solid fa-basket-shopping"></i>
                </Link>
              </div>
          </li>
          )}

      <div className='top'>
            <div className='top-text'>Contact</div>
      </div>

      <div className='content'>
        <h1>Get in Touch with Us</h1><br></br>
        <p className='content-text'>We're here to help! Whether you have a question about our products, need assistance with an order, or just want to learn more about 
          Agri Shop, feel free to reach out. 
          Fill out the form below or use the contact information provided to get in touch with our team. We look forward to hearing from you!"
        </p>
      </div>

      <div className='content-form'>
        <div className='form'>
            <div className='form2'>
              <form>
                <input placeholder='Your Name*' className='input'></input>
                <input placeholder='Your Email*' className='input'></input><br></br>
                <input placeholder='Your Address*' className='input'></input>
                <input placeholder='Your Phone*' className='input'></input><br></br>
                <textarea cols={69} rows={5} placeholder='Your Message...'></textarea>

                <button className='message-button'>Send Message</button>
              </form>
            </div>

            <div className='info'>
              <div className='info-1'>
                <p>Any Questions? Call Us</p>
                <i className="fa-solid fa-phone fa-2x"></i> 
                +381 613000896
              </div><br></br><br></br>

              <div className='info-1'>
                <p>Any Questions? Email Us</p>
                <i className="fa-solid fa-envelope fa-2x"></i> 
                agrishop.organic@gmail.com
              </div>
              
            </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
