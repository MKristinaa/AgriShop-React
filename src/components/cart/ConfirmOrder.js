import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import { createOrder } from '../../actions/orderActions';
import Cookies from 'js-cookie';

const ConfirmOrder = ({ history }) => {
    const [cartItems, setCartItems] = useState([]);
    const [shippingInfo, setShippingInfo] = useState({});
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(null);

    // Get cart items, shipping info, and user from localStorage
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const storedShippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};
        const storedUser = JSON.parse(localStorage.getItem('user')) || {};

        setCartItems(storedCartItems);
        setShippingInfo(storedShippingInfo);
        setUser(storedUser);
    }, []);

    // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);


    useEffect(() => {

        const getUserIdFromCookie = () => {
            // Pretpostavljamo da je 'user' kolačić u JSON formatu
            const userCookie = Cookies.get('user');
            
            if (userCookie) {
                const user = JSON.parse(userCookie);
                return user._id; // Pretpostavljamo da 'id' postoji u korisničkom objektu
            }
            
            return null; // Ako kolačić nije prisutan ili ID nije dostupan
        };

        
        setUserId(getUserIdFromCookie());

    },[])

    

    const processToPayment = () => { // Preuzimanje ID korisnika iz kolačića
    
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
                id: "sample_payment_id", // Simulirani ID za sada
                status: "succeeded"
            },
            user: userId
        };
    
        console.log(data);

        if (!data.user || !data.shippingInfo.address || !data.shippingInfo.city || !data.shippingInfo.phone || !data.shippingInfo.postalCode || !data.shippingInfo.country) {
            return alert("Sva polja za korisnika i adresu dostave su obavezna!");
        }
    
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        createOrder(data)
            .then(() => alert("Narudžbina uspešno kreirana!"))
            .catch(err => console.error("Greška prilikom kreiranja narudžbine:", err));
    };
    

    return (
        <Fragment>
            
            <CheckoutSteps ConfirmOrder />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">
                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b> {user && user.name}</p>
                    <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>

                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    {cartItems.map(item => (
                        <Fragment key={item.product}>
                            <hr />
                            <div className="cart-item my-1">
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>

                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}
                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal: <span className="order-summary-values">${itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>Tax: <span className="order-summary-values">${taxPrice}</span></p>
                        <hr />
                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>
                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Proceed to Payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ConfirmOrder;
