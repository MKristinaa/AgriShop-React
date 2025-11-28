import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { register } from '../../actions/userActions';

function SignUp({ history }) {
  const [user, setUser] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    role: 'user',
  });

  const { name, lastname, email, password, role } = user;

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) newErrors.name = 'First name is required.';
    if (!lastname) newErrors.lastname = 'Last name is required.';
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Email is not valid.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    if (!avatar) newErrors.avatar = 'Avatar is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.set('name', name);
    formData.set('lastname', lastname);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('avatar', avatar);
    formData.set('role', role);

    const data = await register(formData);

    setServerMessage(data.message || 'Unexpected response from server.');
    setIsSuccess(data.success);

    if (data.success) {
      setUser({ name: '', lastname: '', email: '', password: '', role: 'user' });
      setAvatar('');
      setAvatarPreview('/images/default_avatar.jpg');
      setErrors({});
    }
  };

  const onChange = (e) => {
    // briše server poruku kad korisnik ponovo kuca
    if (serverMessage) {
      setServerMessage('');
      setIsSuccess(false);
    }

    // briše grešku za polje dok korisnik kuca
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }

    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className='container-signup'>
      <div className='content-signup'>
        <form className='card-signup signup-form' onSubmit={submitHandler} encType='multipart/form-data'>
          <h1 className='title-signup'>SIGN UP</h1>

          {/* Avatar upload kao prvi element */}
          <div className='avatar-upload'>
            <label htmlFor='avatarInput' className='avatar-circle'>
              <img src={avatarPreview} alt='Avatar Preview' />
            </label>
            <input
              type='file'
              id='avatarInput'
              name='avatar'
              accept='image/*'
              onChange={onChange}
              className='avatar-input'
            />
            {errors.avatar && <p className='error-message'>{errors.avatar}</p>}
          </div>

          <div className='form-group'>
            <input type='text' placeholder='NAME' className='form-control' name='name' value={name} onChange={onChange} />
            {errors.name && <p className='error-message'>{errors.name}</p>}
          </div>

          <div className='form-group'>
            <input type='text' placeholder='LASTNAME' className='form-control' name='lastname' value={lastname} onChange={onChange} />
            {errors.lastname && <p className='error-message'>{errors.lastname}</p>}
          </div>

          <div className='form-group'>
            <input type='email' placeholder='EMAIL' className='form-control' name='email' value={email} onChange={onChange} />
            {errors.email && <p className='error-message'>{errors.email}</p>}
          </div>

          <div className='form-group'>
            <input type='password' placeholder='PASSWORD' className='form-control' name='password' value={password} onChange={onChange} />
            {errors.password && <p className='error-message'>{errors.password}</p>}
          </div>

          <div className='form-group role-div'>
            <label htmlFor='role_field'>Role:</label>
            <select id='role_field' className='select-role' name='role' value={role} onChange={onChange}>
              <option value='user'>User</option>
              <option value='seller'>Seller</option>
              <option value='admin'>Admin</option>
            </select>
          </div>

          <button id='register_button' type='submit' className='btn btn-block custom-button'>
            REGISTER
          </button>


          {serverMessage && (
            <p className={isSuccess ? 'server-message-success' : 'server-message-error'}>{serverMessage}</p>
          )}

          <div className='login'>
            <p>
              Already have an account? <Link to='/login'>Log in here</Link>.
            </p>
          </div>
        </form>
      </div>
    </div>

    
  );
}

export default SignUp;
