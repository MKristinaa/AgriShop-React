import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { myOrders } from '../../actions/orderActions';
import Cookies from 'js-cookie';
import './ListOrders.css';

const ListOrders = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = Cookies.get('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                try {
                    const response = await myOrders(parsedUser._id);
                    setOrders(response);
                } catch (error) {
                    console.error('Failed to load user data:', error);
                }
            }
        }
        fetchUserData();
    }, []);

    const setOrdersData = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        };

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p className='order-status-success'>{order.orderStatus}</p>
                    : <p className='order-status-failed'>{order.orderStatus}</p>,
                actions:
                    <Link to={`/order/${order._id}`} className="order-action-btn">
                        <i className="fa fa-eye"></i>
                    </Link>
            });
        });

        return data;
    };

    return (
        <Fragment>
        {(user === null || user.role === 'seller' || user.role === 'user') && (
                <li className='nav-item'>
                    <div className='cart'>
                        <Link to='/cart' className='link-cart'>
                            <i className="fa-solid fa-basket-shopping"></i>
                        </Link>
                    </div>
                </li>
            )}
            <div className='top'>
                <div className='top-text myorders-top'>My Orders</div>
            </div>
            <div className='myorders-container'>
                <div className='myorders-table'>
                    {orders && orders.length > 0 ? (
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    {setOrdersData().columns.map(column => (
                                        <th key={column.field}>{column.label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {setOrdersData().rows.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.id}</td>
                                        <td>{row.numOfItems}</td>
                                        <td>{row.amount}</td>
                                        <td>{row.status}</td>
                                        <td>{row.actions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            </div>

            
        </Fragment>
    );
};

export default ListOrders;
