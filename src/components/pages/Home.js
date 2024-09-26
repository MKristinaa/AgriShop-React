import React, { useState, useEffect } from 'react';
import '../../App.js';
import './Home.css';

import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';


function Home() {
  
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
  }, []);
  return (
    <>
    <div className='home-container'>
      
      {/* CART */}
      {(user === null || user.role === 'seller' || user.role === 'user' ) && (
          <li className='nav-item'>
              <div className='cart'>
                <Link to='/cart'>
                    <i class="fa-solid fa-basket-shopping"></i>
                </Link>
              </div>
          </li>
          )}

      <div className='home-content'>
        
        <div className='home-title'>
        100% Organic
        </div>

        <div className='home-text-1'>
        Fresh & Natural Farm Food  
        </div>

        <div className='home-text-2'>
        Discover a wide range of organic fruits, vegetables, and other farm products directly from local farmers.
        </div>

        <Link to='/product'>
            <button className='order-button'>Order Online</button>
        </Link>

        

      </div>

    </div>

    <div className='home-container-2'>
      <div className='container-2-item'>
        <div className='icon-1'>
          <div className='icon'>
            <i className="fa-solid fa-truck-fast fa-2x"></i>
          </div>
        </div>
        <div>
          <b>Free Shipping</b>
        </div>
      </div>

      <div className='container-2-item'>
        <div className='icon-1'>
          <div className='icon'>
            <i className="fa-solid fa-wheat-awn fa-2x"></i>
          </div>
        </div>
        <div>
          <b>Fresh & Healthy</b>
        </div>
      </div>

      <div className='container-2-item'>
        <div className='icon-1'>
          <div className='icon'>
            <i className="fa-solid fa-lemon fa-2x"></i>
          </div>
        </div>
        <div>
          <b>From Our Farm</b>
        </div>
      </div>
      <div className='container-2-item'>
      <div className='icon-1'>
          <div className='icon'>
            <i className="fa-solid fa-tractor fa-2x"></i>
          </div>
        </div>
        <div>
          <b>Supporting Local Farmers</b>
        </div>
      </div>
    </div>

    <div className='home-about'>
      <div className='about-containt'>
        <h1>About Us...</h1><br></br><br></br>
        <h2>Connecting You to Fresh, Local Produce.</h2><br></br><br></br>
        <p>Agri Shop is an online platform designed to bridge the gap between local farmers and consumers. 
          Our mission is to empower farmers by providing them with a direct channel to sell their fresh, 
          organic produce without the interference of middlemen. By cutting out the middlemen, we ensure that farmers get a fair price for 
          their hard work, while consumers benefit from access to high-quality, farm-fresh products.
        </p><br></br>
        <p>
        At Agri Shop, we believe in sustainable and responsible farming. All our products are sourced directly from farms that prioritize 
        organic and eco-friendly practices. By shopping with us, you're not only supporting local agriculture but also investing in your 
        health and the environment. Join us in creating a community that values quality, transparency, and the well-being of both farmers 
        and consumers.
        </p>
      </div>
    </div>

    <div className='home-products'>
      <b><h1>Category Of Our Products</h1></b><br></br>
      <p>Discover our selection of fresh, locally-sourced products that bring the farm to your table.</p>

      <div className='products'> 


          <Link to={`/product?category=Fruits`} className='container-2-item category-links'>
              <div className='product2'>
                <img src={require('../../images/product-2.jpg')}></img>
              </div>
              <div>
                Fruits
              </div>
          </Link>


          <Link to={`/product?category=Vegetables`} className='container-2-item category-links'>
            <div className='product1'>
              <img src={require('../../images/tomato2.jpg')} width={170}/>
            </div>
            <div>
              Vegetables
            </div>
          </Link>

          <Link to={`/product?category=Grains`} className='container-2-item category-links'>
            <div className='product3'>
              <img src={require('../../images/grain3.png')} width={170}/>
            </div>
            <div>
              Grains
            </div>
          </Link>


          <div className='container-2-item'>
            <div className='producit4'>
              <img src={require('../../images/product-1.jpg')}></img>
            </div>
            <div>
              other
            </div>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default Home