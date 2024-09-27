import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Profile.css'; // Import CSS
import { loadUser } from '../../actions/userActions';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = Cookies.get('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        try {
          const userData = await loadUser(parsedUser._id);
          setUser(userData.user); 
        } catch (error) {
          console.error('Failed to load user data:', error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="profile-container">
        <h2 className="profile-header">Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <h2 className="profile-header">User not found</h2>
      </div>
    );
  }

  return (
    <div className='position'>
    <div className="profile-container">
      <div className="card profile-card">
        <div className="card-body">
          <div className="user-info">
            {/* Leva kolona sa slikom i dugmetom */}
            <div className="avatar-column">
              <div className="avatar-profile">
                <img
                  src={user.avatar ? user.avatar.url : 'default-avatar.png'}
                  alt={user.name || 'User Avatar'}
                />
              </div>

              <div className="edit-profile-btn">
                <Link to="/me/update" className="btn btn-primary mt-3">
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Desna kolona sa podacima o korisniku */}
            <div className="user-details-column">
              <div className="user-details">
                <h4>First Name</h4>
                <p>{user.name || 'N/A'}</p>

                <h4>Last Name</h4>
                <p>{user.lastname || 'N/A'}</p>

                <h4>Email Address</h4>
                <p>{user.email || 'N/A'}</p>

                <h4>Joined On</h4>
                <p>{user.createdAt ? String(user.createdAt).substring(0, 10) : 'N/A'}</p>

                {user.role !== 'admin' && (
                  <Link to="/orders/me" className="btn btn-danger mt-3">
                    My Orders
                  </Link>
                )}

                <Link to="/password/update" className="btn btn-primary mt-3">
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Profile;
