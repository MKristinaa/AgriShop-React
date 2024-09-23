import React, { Fragment, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useParams, useNavigate } from 'react-router-dom';
import { updateUser, getUserDetails } from '../../actions/userActions';

const UpdateUser = () => {
    const { id: userId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await getUserDetails(userId);
                console.log("User details:", userDetails);

                if (userDetails) {
                    setName(userDetails.user.name || '');
                    setLastname(userDetails.user.lastname || '');
                    setEmail(userDetails.user.email || '');
                    setRole(userDetails.user.role || 'user');
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [userId]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const data = {
            name,
            lastname,
            email,
            role,
        };

        await updateUser(userId, data);
        alert('User updated successfully!');
        navigate('/admin/users');
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update User</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastname_field">Lastname</label>
                                    <input
                                        type="text"
                                        id="lastname_field"
                                        className="form-control"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role_field">Role</label>
                                    <select
                                        id="role_field"
                                        className="form-control"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
                                    Update
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateUser;
