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

  const [avatarFile, setAvatarFile] = useState(null); // ✅ pravi fajl
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // ✅ Validacija forme
  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) newErrors.name = 'First name is required.';
    if (!lastname) newErrors.lastname = 'Last name is required.';
    if (!email) newErrors.email = 'Email is required.';
    else if (!emailPattern.test(email)) newErrors.email = 'Email is not valid.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long.';
    if (!avatarFile) newErrors.avatar = 'Avatar is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Slanje forme
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('avatar', avatarFile); // ✅ fajl, ne base64

    // 🔍 Log radi provere
    console.log('📦 FormData koji se šalje:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const data = await register(formData);

    setServerMessage(data.message || 'Unexpected response from server.');
    setIsSuccess(data.success);

    if (data.success) {
      setUser({ name: '', lastname: '', email: '', password: '', role: 'user' });
      setAvatarFile(null);
      setAvatarPreview('/images/default_avatar.jpg');
      setErrors({});
    }
  };

  // ✅ Promene u input poljima
  const onChange = (e) => {
    if (serverMessage) {
      setServerMessage('');
      setIsSuccess(false);
    }

    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }

    if (e.target.name === 'avatar') {
      const file = e.target.files[0];
      if (file) {
        setAvatarFile(file); // ✅ čuvamo fajl
        setAvatarPreview(URL.createObjectURL(file)); // prikaz slike
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className='container-signup'>
      <div className='content-signup'>
        <form
          className='card-signup signup-form'
          onSubmit={submitHandler}
          encType='multipart/form-data'
        >
          <h1 className='title-signup'>SIGN UP</h1>

          {/* Avatar upload */}
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
            <input
              type='text'
              placeholder='NAME'
              className='form-control'
              name='name'
              value={name}
              onChange={onChange}
            />
            {errors.name && <p className='error-message'>{errors.name}</p>}
          </div>

          <div className='form-group'>
            <input
              type='text'
              placeholder='LASTNAME'
              className='form-control'
              name='lastname'
              value={lastname}
              onChange={onChange}
            />
            {errors.lastname && <p className='error-message'>{errors.lastname}</p>}
          </div>

          <div className='form-group'>
            <input
              type='email'
              placeholder='EMAIL'
              className='form-control'
              name='email'
              value={email}
              onChange={onChange}
            />
            {errors.email && <p className='error-message'>{errors.email}</p>}
          </div>

          <div className='form-group'>
            <input
              type='password'
              placeholder='PASSWORD'
              className='form-control'
              name='password'
              value={password}
              onChange={onChange}
            />
            {errors.password && <p className='error-message'>{errors.password}</p>}
          </div>

          <div className='form-group role-div'>
            <label htmlFor='role_field'>Role:</label>
            <select
              id='role_field'
              className='select-role'
              name='role'
              value={role}
              onChange={onChange}
            >
              <option value='user'>User</option>
              <option value='seller'>Seller</option>
              <option value='admin'>Admin</option>
            </select>
          </div>

          <button id='register_button' type='submit' className='btn btn-block custom-button'>
            REGISTER
          </button>

          {serverMessage && (
            <p className={isSuccess ? 'server-message-success' : 'server-message-error'}>
              {serverMessage}
            </p>
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
