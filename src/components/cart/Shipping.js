import React, { Fragment, useState, useEffect } from 'react';
import { countries } from 'countries-list';
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from 'react-router-dom'; 

// Remove MetaData and CheckoutSteps imports

const Shipping = () => {
    const countriesList = Object.values(countries);

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [country, setCountry] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Load shipping info from localStorage if available
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

        // Save shipping information to localStorage
        const shippingInfo = { address, city, postalCode, phoneNo, country };
        localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));

        navigate('/order/confirm');

    };

    return (
        <Fragment>
            <CheckoutSteps shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="number"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
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
                            className="btn btn-block py-3"
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
