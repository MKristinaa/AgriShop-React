import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { allOrders } from '../../actions/orderActions';
import { allUsers } from '../../actions/userActions';
import Sidebar from './Sidebar';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const orderResponse = await allOrders();
                const userResponse = await allUsers();

                setOrders(orderResponse.orders); // Pristup nizu porudžbina
                setUsers(userResponse);
            } catch (err) {
                console.error('Failed to load dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                    <div className="row pr-4">
                        <div className="col-xl-6 col-sm-12 mb-3">
                            <div className="card text-white bg-danger o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">
                                        Orders<br /> <b>{orders.length}</b>
                                    </div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="col-xl-6 col-sm-12 mb-3">
                            <div className="card text-white bg-info o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">
                                        Users<br /> <b>{users.length}</b>
                                    </div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;
