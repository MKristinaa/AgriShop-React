import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import Cookies from 'js-cookie';
import { loadUser, loggoutUser } from '../actions/userActions';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [user, setUser] = useState(null);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const logoutHandler = () => {
    loggoutUser();
    Cookies.remove('user');
    Cookies.remove('token');

    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingInfo');

    window.location.href = '/';
    alert('Logged out successfully.');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = Cookies.get('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) { 
          try {
            const userData = await loadUser(parsedUser._id);
            setUser(userData.user);
          } catch (error) {
            console.error('Error loading user data:', error);
          }
        } else {
          console.error('No user ID found in stored user data.');
        }
      }
    };

    fetchUserData();
    showButton();
  }, []);


  

  window.addEventListener('resize', showButton);

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to="/" className='navbar-logo' onClick={closeMobileMenu}>
          AGRI SHOP
          <i className="fa-sharp-duotone fa-solid fa-seedling"></i>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/product' className='nav-links' onClick={closeMobileMenu}>
              Product
            </Link>
          </li>

          {user && user.role === 'seller'  && (
          <li className='nav-item'>
            <Link to='/seller/products' className='nav-links' onClick={closeMobileMenu}>
              MyProducts
            </Link>
          </li>
          )}
          {/* <li className='nav-item'>
            <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
              Contact
            </Link>
          </li> */}
          
          {/* {(user === null || user.role === 'seller' || user.role === 'user' ) && (
          <li className='nav-item'>
            <Link to='/cart' className='nav-links' onClick={closeMobileMenu}>
              Cart
            </Link>
          </li>
          )} */}
          
          <li className='nav-item'>
            {user ? (
              <div className='dropdown'>
                <button className='dropbtn'>
                  <figure className='avatar avatar-nav'>
                    <img
                      src={user.avatar && user.avatar.url}
                      className='rounded-circle'
                    />
                  </figure>
                  <span>{user && user.name}</span>
                </button>
                <div className='dropdown-content'>
                  {user && user.role === 'admin' && (
                    <Link className='dropdown-item' to='/dashboard'>
                      Dashboard
                    </Link>
                  )}
                  {user && user.role !== 'admin' && (
                    <Link className='dropdown-item' to='/orders/me'>
                      Orders
                    </Link>
                  )}
                  <Link className='dropdown-item' to='/me'>
                    Profile
                  </Link>
                  <Link className='dropdown-item text-danger' to='/' onClick={logoutHandler}>
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              
              <Link to='/sign-up' className='nav-links' onClick={closeMobileMenu}>
                Sign Up
              </Link>
            )}

          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
