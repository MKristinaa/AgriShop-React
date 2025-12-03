import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { allOrders, deleteOrder } from '../../actions/orderActions';
import './OrdersList.css';

const OrdersList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await allOrders();
                setOrders(response.orders);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrders();

        if (isDeleted) {
            console.log('Order deleted successfully');
            navigate('/admin/orders');
        }

    }, [isDeleted, navigate]);

    const deleteOrderHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await deleteOrder(id);
                setOrders(orders.filter(order => order._id !== id));
                setIsDeleted(true);
            } catch (err) {
                console.log('Failed to delete order');
            }
        }
    };

    const setOrdersData = () => {
        return orders.map(order => ({
            id: order._id,
            numofItems: order.orderItems.length,
            amount: `${order.totalPrice}€`,
            status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                ? <p className="order-status delivered">{order.orderStatus}</p>
                : <p className="order-status pending">{order.orderStatus}</p>,
            actions: (
                <Fragment>
                    <Link to={`/admin/order/${order._id}`} className="view-btn-mm">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="delete-btn" onClick={() => deleteOrderHandler(order._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            )
        }));
    };

    return (
        <Fragment>
            <div className="orderslist-container">
                <div className="sidebar-container">
                    <Sidebar />
                </div>
                <div className="orders-content-container">
                    <h1 className="heading">All Orders</h1>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>No of Items</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {setOrdersData().map((order, index) => (
                                    <tr key={index}>
                                        <td>{order.id}</td>
                                        <td>{order.numofItems}</td>
                                        <td>{order.amount}</td>
                                        <td>{order.status}</td>
                                        <td>{order.actions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default OrdersList;
