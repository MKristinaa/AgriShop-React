import { login } from '../../actions/userActions';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
  }, [navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
        const response = await login(email, password);

        if (response.success) {
            window.location.href = '/'; 
        } else {
            setError(response.message); 
        }
    } catch (error) {
        setError('An error occurred. Please try again.'); 
    }
};



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
              className='form-control'
            />
          </div>


          <div className="form-group">
            <input 
              type="password"
              id="password_field"
              placeholder='PASSWORD' 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className='form-control'
            />
          </div>


          {error && <p className='error-message'>{error}</p>} 

          <button type='submit' className='btn btn-block custom-button-login'>
            LOGIN
          </button>

          <div className='link-sign-up'>
            <p>
              Don't have an account? <Link to="/sign-up">Register here</Link>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
