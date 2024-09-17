import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { updateProfile } from '../../actions/userActions';

function UpdateProfile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(''); // Change to empty string to handle Base64
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setName(parsedUser.name);
      setEmail(parsedUser.email);
      setAvatarPreview(parsedUser.avatar ? parsedUser.avatar.url : '/images/default_avatar.jpg');
      setAvatar(parsedUser.avatar ? parsedUser.avatar.url : ''); // Ensure avatar is set
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);

    if (avatar) {
      formData.set('avatar', avatar); // Include Base64 string for avatar
    }

    console.log(avatar)

    try {
      const response = await updateProfile(formData);
      console.log('Profile updated successfully:', response);
      // Optionally handle success here
    } catch (error) {
      console.error('Error updating profile:', error);
      // Optionally handle error here
    }
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result); // Store as Base64 string
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
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

            <div className="form-group">
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

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
