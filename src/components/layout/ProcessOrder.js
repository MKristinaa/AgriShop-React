import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getOrderDetails, updateOrder } from '../../actions/orderActions';
import './ProcessOrder.css'

const ProcessOrder = () => {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);

    const { id: orderId } = useParams();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await getOrderDetails(orderId);
                console.log("fdsa", response);
                setOrder(response);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrderDetails();

        if (error) {
            console.log(error);
        }

        if (isUpdated) {
            console.log('Order updated successfully');
        }

    }, [error, isUpdated, orderId]);

    const updateOrderHandler = async (id) => {
        const formData = new FormData();
        formData.set('status', status);

        try {
            const response = await updateOrder(id, formData);

            

            if (response) {
                setIsUpdated(true);
                alert("Order updated successfully!");
            } else {
                console.log('Failed to update order');
            }
        } catch (err) {
            console.log('Error updating order');
        }
    };

    const shippingDetails = order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`;
    const isPaid = order.paymentInfo && order.paymentInfo.status === 'succeeded';

    return (
        <Fragment>
            <div className="process-order-container">
                <div className="process-order-sidebar">
                    <Sidebar />
                </div>

                <div className="process-order-main">
                    <Fragment>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="process-order-details-wrapper">
                                <div className="process-order-details">
                                    <h1 className="process-order-title">Order #{order._id}</h1>

                                    <h2 className="process-order-heading">Shipping Info</h2>
                                    <p><b>Name: </b> {order.user && order.user.name}</p>
                                    <p><b>Phone: </b> {order.shippingInfo && order.shippingInfo.phone}</p>
                                    <p><b>Address: </b>{order.shippingInfo.address}</p>
                                    <p><b>Country: </b> {order.shippingInfo && order.shippingInfo.country}</p>
                                    <p><b>City: </b> {order.shippingInfo && order.shippingInfo.city}</p>
                                    <p  className="process-order-address"><b>Postal Code:</b> {order.shippingInfo && order.shippingInfo.postalCode}</p>
                                    <p><b>Amount:</b> {order.totalPrice}€</p>

                                    <hr />

                                    <h4 className="process-order-heading">Order Status:</h4>
                                    <p className={order.orderStatus && order.orderStatus.includes('Delivered') ? "process-order-delivered" : "process-order-pending"} ><b>{order.orderStatus}</b></p>

                                    <h4 className="process-order-heading margin">Order Items:</h4>

                                    <hr/>
                                    <div className="process-order-items">
                                        {order.orderItems && order.orderItems.map(item => (
                                            <div key={item.product} className="process-order-item">
                                                <div className="process-order-item-image">
                                                    <img src={item.image} alt={item.name} height="45" width="65" />
                                                </div>

                                                <div className="process-order-item-name">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>

                                                <div className="process-order-item-price">
                                                    <p>{item.price}€</p>
                                                </div>

                                                <div className="process-order-item-quantity">
                                                    <p>{item.quantity} Piece(s)</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>

                                <div className="process-order-status-update">
                                    <h4 className="process-order-heading">Status</h4>

                                    <div className="process-order-status-select">
                                        <select
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button className="process-order-update-btn" onClick={() => updateOrderHandler(order._id)}>
                                        Update Status
                                    </button>
                                </div>

                            </div>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;
