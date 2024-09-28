import React, { useState, useEffect } from 'react';
import { updateProfile, loadUser } from '../../actions/userActions'; 
import Cookies from 'js-cookie';
import './UpdateProfile.css';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(''); 
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
  const [oldAvatar, setOldAvatar] = useState('/images/default_avatar.jpg');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = Cookies.get('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        try {
          const userData = await loadUser(parsedUser._id);
          console.log(userData)
          setUser(userData.user); 
          setUserId(userData.user._id);
          setName(userData.user.name);
          setLastname(userData.user.lastname);
          setEmail(userData.user.email);
          setAvatarPreview(userData.user.avatar ? userData.user.avatar.url : '/images/default_avatar.jpg');
          setAvatar(userData.user.avatar ? userData.user.avatar.url : '');
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      }
    };

    fetchUserData();
    
    
  }, []);

  const convertToBase64 = async (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.responseType = 'blob';
      xhr.open('GET', url);
      xhr.send();
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let avatarData = avatar;

    if (avatar && !avatar.startsWith('data:image')) {
      try {
        avatarData = await convertToBase64(avatar);
      } catch (error) {
        console.error('Error converting avatar to Base64:', error);
        return;
      }
    }

    const data = {
      "name": name,
      "lastname": lastname,
      "email": email,
      "user": userId,
      "avatar": avatarData
    }
    console.log(data);

    try {
      const response = await updateProfile(data);
      alert('Profile updated successfully!');
      navigate('/me')
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result); 
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="update-profile-container">
  <div className="update-profile-card">
    <form className="shadow-lg" onSubmit={submitHandler}>
      <h1 className="update-profile-header">Update Profile</h1>
      <div className="update-profile-form-group">
        <label htmlFor="name_field">Name</label>
        <input
          type="text"
          id="name_field"
          className="form-control"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="update-profile-form-group">
        <label htmlFor="lastname_field">Lastname</label>
        <input
          type="text"
          id="lastname_field"
          className="form-control"
          name="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div className="update-profile-form-group">
        <label htmlFor="email_field">Email</label>
        <input
          type="email"
          id="email_field"
          className="form-control"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

    <div className="update-profile-avatar-upload">
    <label className="avatar_upload">Avatar</label>
    <div className="update-profile-avatar-container d-flex align-items-center">
      <div>
        <figure className="update-profile-avatar-preview mr-3 item-rtl">
          {avatarPreview && <img src={avatarPreview} className="rounded-circle update-profile-avatar-image-preview" alt="Avatar Preview" />}
        </figure>
      </div>
      <div className="update-profile-custom-file-upload">
        <input
          type="file"
          name="avatar"
          className="update-profile-custom-file-input-upload"
          id="customFile"
          accept="image/*"
          onChange={onChange}
        />
        <label className="update-profile-custom-file-label-upload" htmlFor="customFile">
          Choose Avatar
        </label>
    </div>
  </div>
</div>



      <button type="submit" className="update-profile-button">
        Update
      </button>
    </form>
  </div>
</div>

  );
}

export default UpdateProfile;
