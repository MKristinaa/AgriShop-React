import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { myOrders } from '../../actions/orderActions';
import Cookies from 'js-cookie';

const ListOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = Cookies.get('user');
            if (storedUser) {
              const parsedUser = JSON.parse(storedUser);
              console.log(parsedUser._id)
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
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
            });
        });

        return data;
    };

    return (
        <Fragment>
            <h1 className="my-5">My Orders</h1>

            {orders && orders.length > 0 ? (
                <MDBDataTable
                    data={setOrdersData()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            ) : (
                <p>No orders found.</p> 
            )}
        </Fragment>
    );
};

export default ListOrders;
