import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../../actions/orderActions';
import Cookies from 'js-cookie';
import './ConfirmOrder.css';

const ConfirmOrder = ({ history }) => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [shippingInfo, setShippingInfo] = useState({});
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const storedShippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};
        const storedUserCookie = Cookies.get('user'); 
        const storedUser = storedUserCookie ? JSON.parse(storedUserCookie) : {}; 
        
        setCartItems(storedCartItems);
        setShippingInfo(storedShippingInfo);
        setUser(storedUser);
    }, []);

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = 5;
    const taxPrice = Number((0.2 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice ).toFixed(2);

    useEffect(() => {
        const getUserIdFromCookie = () => {
            const userCookie = Cookies.get('user');
            if (userCookie) {
                const user = JSON.parse(userCookie);
                return user._id;
            }
            return null;
        };
        setUserId(getUserIdFromCookie());
    }, []);

    const processToPayment = () => {
        const data = {
            itemPrice: itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            orderItems: cartItems.map(item => ({
                product: item.product,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: item.quantity
            })),
            shippingInfo: {
                address: shippingInfo.address,
                city: shippingInfo.city,
                phone: shippingInfo.phoneNo,
                postalCode: shippingInfo.postalCode,
                country: shippingInfo.country
            },
            paymentInfo: {
                id: "sample_payment_id",
                status: "succeeded"
            },
            user: userId
        };

        if (!data.user || !data.shippingInfo.address || !data.shippingInfo.city || !data.shippingInfo.phone || !data.shippingInfo.postalCode || !data.shippingInfo.country) {
            return alert("Sva polja za korisnika i adresu dostave su obavezna!");
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        createOrder(data)
            .then(() => {alert("Narudžbina uspešno kreirana!");

                        localStorage.removeItem('cartItems');


                        navigate('/');}
            )
        
            .catch(err => console.error("Greška prilikom kreiranja narudžbine:", err));
    };

    return (
        <Fragment>
            <div className="confirm-order-page-container">
                <div className="confirm-order-details-section">
                    <h1 className='confirm-order-title'>Shipping Info</h1>
                    <p><b>Name:</b> {user && user.name}</p>
                    <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                    <p><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city} ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>

                    <hr />
                    <h4>Your Cart Items:</h4>
                    {cartItems.map(item => (
                        <Fragment key={item.product}>
                            <div className="confirm-order-cart-item">
                                <img src={item.image} alt={item.name} />
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                <p className="confirm-order-item-total">{item.quantity} x {item.price}€ = <b>{(item.quantity * item.price).toFixed(2)}€</b></p>

                            </div>
                            <hr />
                        </Fragment>
                    ))}
                </div>

                <div className="confirm-order-summary-section">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal: <span className="confirm-order-summary-value">{itemsPrice}€</span></p>
                    <p>Shipping: <span className="confirm-order-summary-value">{shippingPrice}€</span></p>
                    {/* <p>Tax: <span className="confirm-order-summary-value">{taxPrice}€</span></p> */}
                    <hr />
                    <p>Total: <span className="confirm-order-summary-value">{totalPrice}€</span></p>
                    <button className="confirm-order-checkout-btn" onClick={processToPayment}>Confirm Order</button>
                </div>
            </div>
        </Fragment>
    );
};

export default ConfirmOrder;
