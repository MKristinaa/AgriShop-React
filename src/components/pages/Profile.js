import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Profile.css'; // Import CSS

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = Cookies.get('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="profile-container">
        <h2 className="profile-header">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
      </div>
      <div className="user-info">
        <div className="avatar-profile">
          <img
            src={user.avatar ? user.avatar.url : 'default-avatar.png'}
            alt={user.name || 'User Avatar'}
          />
          <Link to="/me/update" className="btn btn-primary my-5">
            Edit Profile
          </Link>
        </div>
        <div className="user-details">
          <h4>Full Name</h4>
          <p>{user.name || 'N/A'}</p>

          <h4>Email Address</h4>
          <p>{user.email || 'N/A'}</p>

          <h4>Joined On</h4>
          <p>{user.createdAt ? String(user.createdAt).substring(0, 10) : 'N/A'}</p>

          {user.role !== 'admin' && (
            <Link to="/orders/me" className="btn btn-danger mt-5">
              My Orders
            </Link>
          )}

          <Link to="/password/update" className="btn btn-primary mt-3">
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
