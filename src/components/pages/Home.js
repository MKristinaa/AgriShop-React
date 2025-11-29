import React, { useState, useEffect } from 'react';
import '../../App.js';
import './Home.css';
import * as Sentry from '@sentry/react'; 
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Fruits', img: require('../../images/product-2.png') },
    { name: 'Vegetables', img: require('../../images/tomato2.png') },
    { name: 'Grains', img: require('../../images/grain2.png') },
    { name: 'Dairy Products', img: require('../../images/dairy.png') },
    { name: 'Meat & Poultry', img: require('../../images/meat3.png') },
    { name: 'Honey & Beekeeping Products', img: require('../../images/med3.png') },
    { name: 'Herbs & Spices', img: require('../../images/herbs.png') }, // nova
    { name: 'Nuts & Seeds', img: require('../../images/nuts.png') }, // nova
    { name: 'Beverages', img: require('../../images/beverages.png') }, // nova
    { name: 'Others', img: require('../../images/other.png') } // promenjeno ime sa "Other" na "Others"
];


function Home() {
    const [user, setUser] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 4;

    const handlePrev = () => setStartIndex(prev => Math.max(prev - 1, 0));
    const handleNext = () => setStartIndex(prev => Math.min(prev + 1, categories.length - visibleCount));

    const visibleCategories = categories.slice(startIndex, startIndex + visibleCount);

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = Cookies.get('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser) setUser(parsedUser);
            }
        };
        fetchUserData();

        // Testna greška za Sentry
        try { throw new Error("Test greška u Home.js za Sentry"); } 
        catch (error) { Sentry.captureException(error); }
    }, []);

    return (
        <>
            <div className='home-container'>
                {(user === null || user.role === 'seller' || user.role === 'user' ) && (
                    <li className='nav-item'>
                        <div className='cart'>
                            <Link to='/cart'>
                                <i className="fa-solid fa-basket-shopping"></i>
                            </Link>
                        </div>
                    </li>
                )}

                <div className='home-content'>
                    <div className='home-title'>100% Organic</div>
                    <div className='home-text-1'>Fresh & Natural Farm Food</div>
                    <div className='home-text-2'>
                        Discover a wide range of organic fruits, vegetables, and other farm products directly from local farmers.
                    </div>
                    <Link to='/product'>
                        <button className='order-button'>Order Online</button>
                    </Link>
                </div>
            </div>

            <div className='home-container-2'>
                <div className='container-2-item'>
                    <div className='icon-1'><div className='icon'><i className="fa-solid fa-truck-fast fa-2x"></i></div></div>
                    <div><b>Free Shipping</b></div>
                </div>
                <div className='container-2-item'>
                    <div className='icon-1'><div className='icon'><i className="fa-solid fa-wheat-awn fa-2x"></i></div></div>
                    <div>Fresh & Healthy</div>
                </div>
                <div className='container-2-item'>
                    <div className='icon-1'><div className='icon'><i className="fa-solid fa-lemon fa-2x"></i></div></div>
                    <div><b>From Our Farm</b></div>
                </div>
                <div className='container-2-item'>
                    <div className='icon-1'><div className='icon'><i className="fa-solid fa-tractor fa-2x"></i></div></div>
                    <div><b>Supporting Local Farmers</b></div>
                </div>
            </div>

            <div className='home-about'>
                <div className='about-containt'>
                    <h1>About Us...</h1><br/><br/>
                    <h2>Connecting You to Fresh, Local Produce.</h2><br/><br/>
                    <p>
                        Agri Shop is an online platform designed to bridge the gap between local farmers and consumers. 
                        Our mission is to empower farmers by providing them with a direct channel to sell their fresh, 
                        organic produce without the interference of middlemen. By cutting out the middlemen, we ensure that farmers get a fair price for 
                        their hard work, while consumers benefit from access to high-quality, farm-fresh products.
                    </p><br/>
                    <p>
                        At Agri Shop, we believe in sustainable and responsible farming. All our products are sourced directly from farms that prioritize 
                        organic and eco-friendly practices. By shopping with us, you're not only supporting local agriculture but also investing in your 
                        health and the environment. Join us in creating a community that values quality, transparency, and the well-being of both farmers 
                        and consumers.
                    </p>
                </div>
            </div>

            <div className="home-products">
                <h1>Category Of Our Products</h1>
                <p>Discover our selection of fresh, locally-sourced products that bring the farm to your table.</p>

                <div className="carousel-wrapper">
                    <button className="carousel-arrow left" onClick={handlePrev} disabled={startIndex === 0}>&#10094;</button>
                    <div className="products">
                        {visibleCategories.map((cat, idx) => (
                            <Link key={idx} to={`/product?category=${cat.name}`} className="container-2-item category-links">
                                <div className="product-img">
                                    <img src={cat.img} alt={cat.name} />
                                </div>
                                <div className="product-name">{cat.name}</div>
                            </Link>
                        ))}
                    </div>
                    <button className="carousel-arrow right" onClick={handleNext} disabled={startIndex >= categories.length - visibleCount}>&#10095;</button>
                </div>
            </div>
        </>
    );
}

export default Home;
