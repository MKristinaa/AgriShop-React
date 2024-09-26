import { login } from '../../actions/userActions'

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'; // You can use the js-cookie library for easier cookie handling
import './Login.css';
function Login2() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const navigate = useNavigate();
    const location = useLocation();
  
    const redirect = location.search ? location.search.split('=')[1] : '/';
  
    // Check for user token in cookies
    useEffect(() => {
      const userToken = Cookies.get('user'); // Assumes the token is stored as 'token'
      if (userToken) {
        navigate(redirect); // If user is logged in, redirect to the desired page
      }
    }, [navigate, redirect]);
  
    const submitHandler = (e) => {
      e.preventDefault();
      login(email, password);
  
      navigate(redirect); 
      
    }
    return (
      <div className='login-container'>
        <div className='login-content'>
          <form onSubmit={submitHandler}>
              <h1 className='title-login'>LOGIN</h1>
              
              <div className="form-group">
                <input 
                    type="email"
                    id="email_field"
                    placeholder='EMAIL' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className='form-control'/>
              </div>
  
              
              <div className="form-group">
                <input 
                    type="password"
                    id="password_field"
                    placeholder='PASSWORD' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    className='form-control'/>
              </div>
  
      
              <button type='submit' className='btn btn-block custom-button-login'>
                LOGIN
              </button>
  
              <div className='register-link'>
                  <p>
                  Don't have an account? <Link to="/sign-up">Register here</Link>.
                  </p>
                </div>
          </form>
        </div>
      </div>
    )
}

export default Login2
