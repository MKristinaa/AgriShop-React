import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Sidebar from './Sidebar';
import { allUsers, deleteUser } from '../../actions/userActions';
import './UsersList.css'; // Uvezi jedinstvenu CSS datoteku

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = Cookies.get('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                try {
                    const fetchedUsers = await allUsers();
                    const filteredUsers = fetchedUsers.filter(user => user._id !== parsedUser._id);
                    setUsers(filteredUsers);
                } catch (error) {
                    console.error('Error loading user data:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    const deleteUserHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const deletUser = await deleteUser(id);
                if (deletUser) {
                    alert("Deleted successfully");
                    setUsers(users.filter(user => user._id !== id));
                }
            } catch (err) {
                console.log('Failed to delete user');
            }
        }
    };

    return (
        <Fragment>
            <div className="userslist-page-container">
                <div className="userslist-sidebar-container">
                    <Sidebar />
                </div>

                <div className="userslist-content-container">
                    <h1 className="userslist-heading">All Users</h1>

                    <table className="userslist-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Link to={`/admin/user/${user._id}`} className="userslist-edit-btn">
                                            <i className="fa fa-pencil"></i>
                                        </Link>
                                        <button className="userslist-delete-btn" onClick={() => deleteUserHandler(user._id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
};

export default UsersList;
