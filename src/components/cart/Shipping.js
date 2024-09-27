import React, { Fragment, useState, useEffect } from 'react';
import { countries } from 'countries-list';
import { useNavigate } from 'react-router-dom';
import './Shipping.css';

const Shipping = () => {
    const countriesList = Object.values(countries);

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [country, setCountry] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const savedShippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
        if (savedShippingInfo) {
            setAddress(savedShippingInfo.address || '');
            setCity(savedShippingInfo.city || '');
            setPostalCode(savedShippingInfo.postalCode || '');
            setPhoneNo(savedShippingInfo.phoneNo || '');
            setCountry(savedShippingInfo.country || '');
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        const shippingInfo = { address, city, postalCode, phoneNo, country };
        localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));

        navigate('/order/confirm');
    };

    return (
        <Fragment>
            <div className="shipping-wrapper">
                <div className="shipping-form-container">
                    <form className="shipping-form" onSubmit={submitHandler}>
                        <h1 className="shipping-title">Shipping Info</h1>

                        <div className="shipping-form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="shipping-input"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="shipping-input"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor="phone_field">Phone Number</label>
                            <input
                                type="number"
                                id="phone_field"
                                className="shipping-input"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="shipping-input"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="shipping-select"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                {countriesList.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="shipping-button"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;
