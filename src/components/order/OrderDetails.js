import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails } from '../../actions/orderActions';
import './OrderDetails.css'; // Custom CSS file

const OrderDetails = () => {
    const [order, setOrder] = useState({});
    const { id } = useParams();
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getOrderDetails(id);
                setOrder(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded';

    return (
        <Fragment>
            <h1 className="order-details-title">Order #{order._id}</h1>
            <div className="order-details-card">
                <div className="shipping-info card-section">
                    <h2>Shipping Info</h2>
                    <p><strong>Name:</strong> {user && user.name}</p>
                    <p><strong>Email:</strong> {user && user.email}</p>
                    <p><strong>Phone:</strong> {shippingInfo && shippingInfo.phone}</p>
                    <p><strong>Address:</strong> {shippingInfo && shippingInfo.address}</p>
                    <p><strong>Country:</strong> {shippingInfo && shippingInfo.country}</p>
                    <p><strong>City:</strong> {shippingInfo && shippingInfo.city}</p>
                    <p><strong>Postal Code:</strong> {shippingInfo && shippingInfo.postalCode}</p>
                    <p><strong>Amount:</strong> ${totalPrice}</p>
                </div>
{/* 
                <hr />

                <div className="payment-info card-section">
                    <h4>Payment</h4>
                    <p className={isPaid ? "status-paid" : "status-not-paid"}><strong>{isPaid ? "PAID" : "NOT PAID"}</strong></p>
                </div> */}

                <hr />

                <div className="order-status-info card-section">
                    <h4>Order Status:</h4>
                    <p className={orderStatus && orderStatus.includes('Delivered') ? "status-delivered" : "status-pending"}>
                        <strong>{orderStatus}</strong>
                    </p>
                </div>

                <hr />

                <div className="order-items card-section">
                    <h4>Order Items:</h4>
                    {orderItems && orderItems.map(item => (
                        <div key={item.product} className="order-item">
                            <img src={item.image} alt={item.name} className="order-item-image" />
                            <Link to={`/product/${item.product}`} className="order-item-name">{item.name}</Link>
                            <p className="order-item-price">${item.price}</p>
                            <p className="order-item-quantity">{item.quantity} Piece(s)</p>
                        </div>
                    ))}
                </div>
            </div>
                <li className='nav-item'>
                    <div className='cart'>
                        <Link to='/cart' className='link-cart'>
                            <i className="fa-solid fa-basket-shopping"></i>
                        </Link>
                    </div>
                </li>
        </Fragment>
    );
};

export default OrderDetails;
