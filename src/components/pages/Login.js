import { login } from '../../actions/userActions';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);

      if (response.success) {
        window.location.href = redirect;
      } else {
        setError(response.message);
      }
    } catch {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className='login-container'>
      <div className='login-content'>
        <form className='login-form' onSubmit={submitHandler}>
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

          <button type='submit' className='custom-button-login'>
            LOGIN
          </button>

          {error && <p className='error-message'>{error}</p>}

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
