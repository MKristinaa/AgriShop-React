import React, { useState, useEffect } from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'


import { register } from '../../actions/userActions'

function SignUp({ history }) {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password:''
  })

  const {name, email, password} = user;

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

  useEffect(() => {
    
  },[history])

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('avatar', avatar);

console.log(avatar)
    register(formData);
  }



    const onChange = (e) =>{
        if(e.target.name === "avatar"){
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
              
            }

            reader.readAsDataURL(e.target.files[0])
        } else{

            setUser({...user, [e.target.name]: e.target.value})
        }
    }

  return (
    <div className='container-signup'>

        <div className='content-signup'>
        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
              <h1 className='title-signup'>SIGN UP</h1>

              <div className="form-group">
                  <input
                      type="name"
                      id="name_field"
                      placeholder='NAME' 
                      className="form-control"
                      name='name'
                      value={name}
                      onChange={onChange}
                  />
              </div>

              <div className="form-group">
                  <input
                      type="email"
                      id="email_field"
                      placeholder='EMAIL'
                      className="form-control"
                      name='email'
                      value={email}
                      onChange={onChange}
                  />
              </div>

              <div className="form-group">
                  <input
                      type="password"
                      id="password_field"
                      placeholder='PASSWORD'
                      className="form-control"
                      name='password'
                      value={password}
                      onChange={onChange}
                  />
              </div>

              <div className='form-group'>
                  <div className='avatar'>
                      <div>
                          <figure className='avatar mr-3 item-rtl'>
                              <img
                                  src={avatarPreview}
                                  alt='Avatar Preview'
                                  
                              />
                          </figure>
                      </div>
                      <div className='custom-file'>
                          <input
                              type='file'
                              name='avatar'
                              className='custom-file-input'
                              id='customFile'
                              accept="iamges/*"
                              onChange={onChange}
                          />
                          <label className='custom-file-label' htmlFor='customFile'>
                              Choose Avatar
                          </label>
                      </div>
                  </div>
              </div>

              <button
                  id="register_button"
                  type="submit"
                  className="btn btn-block custom-button"
              >
                  REGISTER
              </button>

              <div className='login'>
                <p>
                    Already have an account? <Link to="/login">Log in here</Link>.
                </p>
              </div>
          </form>
        </div>


    </div>
  )
}

export default SignUp
