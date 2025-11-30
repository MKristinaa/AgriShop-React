import React, { Fragment, useEffect, useState } from 'react';
import { newProduct } from '../../actions/productActons'; 
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './NewProduct.css';

const NewProduct = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [user, setUser] = useState(0);
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stocks, setStocks] = useState('');
    const [errors, setErrors] = useState({});

    const categories = [
        'Vegetables',
        'Fruits',
        'Grains',
        'Dairy Products',
        'Meat & Poultry',
        'Honey & Beekeeping Products',
        'Herbs & Spices',
        'Nuts & Seeds',
        'Beverages',
        'Others'
    ];

    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser._id);
        }
    }, []);

    const validateFields = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!price) newErrors.price = "Price is required";
        if (!description.trim()) newErrors.description = "Description is required";
        if (!category) newErrors.category = "Category is required";
        if (!stocks) newErrors.stocks = "Stock field is required";
        if (!image) newErrors.image = "Image is required";
        return newErrors;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const newErrors = validateFields();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const data = { user, name, price, description, stocks, category, image };
        await newProduct(data);
        alert("Product successfully created!");
        navigate('/seller/products', { state: { productName: name } });
    };

    const onChangeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Fragment>
            <div className="new-product-container">
                <div className="new-product-card">
                    <h2 className="new-product-header">Create New Product</h2>

                    <form className="new-product-form" onSubmit={submitHandler}>
                        <div className="new-product-form-group">
                            <label>Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            {errors.name && <p className="error-message">{errors.name}</p>}
                        </div>

                        <div className="new-product-form-group">
                            <label>Price</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                            {errors.price && <p className="error-message">{errors.price}</p>}
                        </div>

                        <div className="new-product-form-group">
                            <label>Description</label>
                            <textarea value={description} rows="5" onChange={(e) => setDescription(e.target.value)} />
                            {errors.description && <p className="error-message">{errors.description}</p>}
                        </div>

                        <div className="new-product-form-group">
                            <label>Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            {errors.category && <p className="error-message">{errors.category}</p>}
                        </div>

                        <div className="new-product-form-group">
                            <label>Stock</label>
                            <input type="number" value={stocks} onChange={(e) => setStocks(e.target.value)} />
                            {errors.stocks && <p className="error-message">{errors.stocks}</p>}
                        </div>

                        {/* File upload */}
                        <div className="new-product-form-group">
                            <label className="avatar_upload">Product Image</label>
                            <input 
                                type="file" 
                                name="image" 
                                accept="image/*" 
                                onChange={onChangeImage} 
                                className="custom-file-input-upload"
                            />
                            {errors.image && <p className="error-message">{errors.image}</p>}

                            {image && (
                                <div className="image-preview-container">
                                    <img src={image} alt="Product Preview" className="image-preview" />
                                </div>
                            )}
                        </div>

                        <button type="submit" className="new-product-button">CREATE</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewProduct;
