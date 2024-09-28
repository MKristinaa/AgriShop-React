import React, { Fragment, useState, useEffect } from 'react';
import { updatePassword } from '../../actions/userActions';
import './UpdatePassword.css'; 
import Cookies from 'js-cookie';

function UpdatePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserId(parsedUser._id);
        }
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        const data = {
            password,
            oldPassword,
            id: userId
        };

        try {
            const response = await updatePassword(data);

            setError(null);

            if (response.success) {
                alert('Password updated successfully!');
            } else {
                setError(response.message); 
            }
        } catch (err) {
            setError('An error occurred. Please try again.'); 
        }
    };

    return (
        <Fragment>
            <div className="update-password-container">
    <div className="update-password-card">
        <form onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5">Update Password</h1>

            <div className="update-password-form-group">
                <input
                    type="password"
                    id="old_password_field"
                    className="form-control"
                    placeholder='Old Password'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </div>

            <div className="update-password-form-group">
                <input
                    type="password"
                    id="new_password_field"
                    className="form-control"
                    placeholder='New Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && <p className='error-message'>{error}</p>}

            <button type="submit" className="btn update-password-btn btn-block mt-4 mb-3">
                Update Password
            </button>
        </form>
    </div>
</div>

        </Fragment>
    );
}

export default UpdatePassword;
