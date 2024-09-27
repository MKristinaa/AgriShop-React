import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Cart.css'; // Custom CSS file

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate();  // Using useNavigate instead of history

    useEffect(() => {
        // Read cart items from localStorage
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    const updateLocalStorage = (items) => {
        localStorage.setItem('cartItems', JSON.stringify(items));
        setCartItems(items);
    };

    const removeCartItemHandler = (id) => {
        const updatedCartItems = cartItems.filter(item => item.product !== id);
        updateLocalStorage(updatedCartItems);
    };

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) return;

        const updatedCartItems = cartItems.map(item => 
            item.product === id ? { ...item, quantity: newQty } : item
        );
        updateLocalStorage(updatedCartItems);
    };

    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty <= 0) return;

        const updatedCartItems = cartItems.map(item => 
            item.product === id ? { ...item, quantity: newQty } : item
        );
        updateLocalStorage(updatedCartItems);
    };

    const checkoutHandler = () => {
        const token = Cookies.get('token');

        if (token) {
            navigate('/login/shipping');
        } else {
            alert('Login first!')
            navigate('/login');
        }
    };

    return (
        <Fragment>
            {cartItems.length === 0 ? (
                <h2 className="cart-empty-msg">Your Cart is Empty</h2>
            ) : (
                <Fragment>
                    <h1 className="cart-title">Your Cart: <b>{cartItems.length} items</b></h1>

                    <div className="cart-container">
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <Fragment key={item.product}>
                                    <hr className="cart-divider" />
                                    <div className="cart-item">
                                        <div className="cart-item-row">
                                            <div className="cart-item-image-container">
                                                <img src={item.image} alt="Product" className="cart-item-image" />
                                            </div>

                                            <div className="cart-item-name">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>

                                            <div className="cart-item-price">
                                                <p>${item.price}</p>
                                            </div>

                                            <div className="cart-item-quantity">
                                                <div className="cart-item-qty-control">
                                                    <button className="qty-btn" onClick={() => decreaseQty(item.product, item.quantity)}>-</button>
                                                    <input type="number" className="qty-input" value={item.quantity} readOnly />
                                                    <button className="qty-btn" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</button>
                                                </div>
                                            </div>

                                            <div className="cart-item-remove">
                                                <button className="remove-btn" onClick={() => removeCartItemHandler(item.product)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="cart-divider" />
                                </Fragment>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <div className="summary-box">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal: <span className="summary-value">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                                <p>Est. total: <span className="summary-value">${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>
                                <hr />
                                <button className="checkout-btn" onClick={checkoutHandler}>Check out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Cart;
