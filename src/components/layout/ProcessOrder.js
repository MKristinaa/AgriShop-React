import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Importuj useParams
import Sidebar from './Sidebar';
import { getOrderDetails, updateOrder } from '../../actions/orderActions'; // Importovano prema tvojoj potrebi
import { compose } from 'redux';

const ProcessOrder = () => {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);

    const { id: orderId } = useParams(); // Uzimanje orderId iz URL-a koristeći useParams

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await getOrderDetails(orderId); 
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

            console.log("ojihugifythfg",response);

            if (response) {
                setIsUpdated(true);
                alert("Order updated successfully!")
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
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">
                                    <h2 className="my-5">Order # {order._id}</h2>

                                    <h4 className="mb-4">Shipping Info</h4>
                                    <p><b>Name:</b> {order.user && order.user.name}</p>
                                    <p><b>Phone:</b> {order.shippingInfo && order.shippingInfo.phoneNo}</p>
                                    <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                                    <p><b>Amount:</b> ${order.totalPrice}</p>

                                    <hr />

                                    <h4 className="my-4">Payment</h4>
                                    <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>

                                    <h4 className="my-4">Stripe ID</h4>
                                    <p><b>{order.paymentInfo && order.paymentInfo.id}</b></p>

                                    <h4 className="my-4">Order Status:</h4>
                                    <p className={order.orderStatus && order.orderStatus.includes('Delivered') ? "greenColor" : "redColor"} ><b>{order.orderStatus}</b></p>

                                    <h4 className="my-4">Order Items:</h4>

                                    <hr />
                                    <div className="cart-item my-1">
                                        {order.orderItems && order.orderItems.map(item => (
                                            <div key={item.product} className="row my-5">
                                                <div className="col-4 col-lg-2">
                                                    <img src={item.image} alt={item.name} height="45" width="65" />
                                                </div>

                                                <div className="col-5 col-lg-5">
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </div>

                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p>${item.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <p>{item.quantity} Piece(s)</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
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
