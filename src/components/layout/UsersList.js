import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import Sidebar from './Sidebar'
import { allUsers, deleteUser } from '../../actions/userActions'

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await allUsers();
            setUsers(fetchedUsers);
        }

        fetchUsers();
    }, [])


    const deleteUserHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {

                const deletUser = await deleteUser(id); // Zameni sa pravim API endpointom
                if(deletUser){
                    alert("Deleted successfully")
                    setUsers(users.filter(user => user._id !== id));
                }
                
            } catch (err) {
                console.log('Failed to delete user');
            }
        }
    };

    const setUsersTable = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,

                actions: (
                    <Fragment>
                        <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Users</h1>

                        <MDBDataTable
                            data={setUsersTable()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default UsersList