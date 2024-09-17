import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

import { login } from '../../actions/userActions'


function Login({ history }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    
    
  },[history])

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
    
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

export default Login
