import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { allOrders } from '../../actions/orderActions';
import { allUsers } from '../../actions/userActions';
import Sidebar from './Sidebar';
import './Dashboard.css'; 

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const orderResponse = await allOrders();
                const userResponse = await allUsers();

                setOrders(orderResponse.orders); 
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
            <div className="dashboard-layout">
                <Sidebar />
                <div className="dashboard-content">
                    <h1 className="dashboard-heading">Dashboard</h1>

                    <div className="dashboard-cards">
                        <div className="dashboard-card dashboard-card-danger">
                            <div className="dashboard-card-body">
                                <div className="dashboard-card-text">
                                    Orders<br /> <b>{orders.length}</b>
                                </div>
                            </div>
                            <Link className="dashboard-card-footer" to="/admin/orders">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>

                        <div className="dashboard-card dashboard-card-info">
                            <div className="dashboard-card-body">
                                <div className="dashboard-card-text">
                                    Users<br /> <b>{users.length - 1}</b>
                                </div>
                            </div>
                            <Link className="dashboard-card-footer" to="/admin/users">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;
