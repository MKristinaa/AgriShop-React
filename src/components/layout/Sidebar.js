import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Uvezi CSS datoteku

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="sidebar-list">
                    <li>
                        <Link to="/dashboard" className="sidebar-link"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/orders" className="sidebar-link"><i className="fa fa-shopping-basket"></i> Orders</Link>
                    </li>
                    <li>
                        <Link to="/admin/users" className="sidebar-link"><i className="fa fa-users"></i> Users</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
