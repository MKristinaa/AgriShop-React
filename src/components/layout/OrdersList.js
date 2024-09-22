import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Sidebar from './Sidebar';
import { allOrders, deleteOrder, clearErrors } from '../../actions/orderActions';

const OrdersList = ({ history }) => {
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

    }, [alert, error, isDeleted, history]);

    const deleteOrderHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await deleteOrder(id); // Zameni sa pravim API endpointom
                setOrders(orders.filter(order => order._id !== id));
                setIsDeleted(true);
            } catch (err) {
                console.log('Failed to delete order');
            }
        }
    };

    const setOrdersData = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
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
                },
            ],
            rows: []
        };

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions: <Fragment>
                    <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            });
        });

        return data;
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Orders</h1>

                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <MDBDataTable
                                data={setOrdersData()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default OrdersList;
