import React, { Fragment, useEffect, useState } from 'react';
import { newProduct } from '../../actions/productActons'; 
import { useNavigate } from 'react-router-dom';
import './NewProduct.css';
import Cookies from 'js-cookie';

const NewProduct = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [user, setUser] = useState(0);
    const [base64Image, setBase64Image] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stocks, setStocks] = useState(0);
    const [imageURL, setImageURL] = useState('');
    const [imagesPreview, setImagesPreview] = useState('/images/default_avatar.jpg');

    const [errors, setErrors] = useState({});

    const categories = [
        'Vegetables',
        'Fruits',
        'Grains'
    ];

    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser._id);
        }
    }, [])

    const validateFields = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!price) newErrors.price = "Price is required";
        if (!description.trim()) newErrors.description = "Description is required";
        if (!category) newErrors.category = "Category is required";
        if (!stocks) newErrors.stocks = "Stock field is required";
        if (!imageURL && !base64Image) newErrors.image = "Image is required";
        return newErrors;
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const newErrors = validateFields();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const data = {
            user,
            name,
            price,
            description,
            stocks,
            category,
            image: imageURL || base64Image
        };

        await newProduct(data); 
        alert("Product successfully created!");
        navigate('/seller/products'); 
    };

    const onChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(reader.result);
                    setImageURL(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Fragment>
            <div className='top'>
                <div className='top-text new-product-top'>Create New Product</div>
            </div>

            <div className="new-product-row">
                <div className="new-product-content">
                    <div className="new-product-form-wrapper">
                        <form className="new-product-form-container" onSubmit={submitHandler}>
                            <div className="new-product-form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && <p className="error-message">{errors.name}</p>}
                            </div>

                            <div className="new-product-form-group">
                                <label htmlFor="price_field">Price</label>
                                <input
                                    type="number"
                                    id="price_field"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                {errors.price && <p className="error-message">{errors.price}</p>}
                            </div>

                            <div className="new-product-form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea
                                    id="description_field"
                                    rows="8"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                                {errors.description && <p className="error-message">{errors.description}</p>}
                            </div>

                            <div className="new-product-form-group">
                                <label htmlFor="category_field">Category</label>
                                <select
                                    id="category_field"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="error-message">{errors.category}</p>}
                            </div>

                            <div className="new-product-form-group">
                                <label htmlFor="stocks_field">Stock</label>
                                <input
                                    type="number"
                                    id="stocks_field"
                                    value={stocks}
                                    onChange={(e) => setStocks(e.target.value)}
                                />
                                {errors.stocks && <p className="error-message">{errors.stocks}</p>}
                            </div>

                            <div className='new-product-form-group'>
                                <div className='avatar'>
                                    <div className='new-product-form-group-image-preview'>
                                        {imagesPreview && <img src={imagesPreview} alt="Image Preview" />}
                                    </div>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='avatar'
                                            className='custom-file-input'
                                            id='customFile'
                                            accept='image/*'
                                            onChange={onChange}
                                        />
                                        <p className='custom-file-label' htmlFor='customFile'>
                                            Choose Image
                                        </p>
                                    </div>
                                </div>
                                {errors.image && <p className="error-message">{errors.image}</p>}
                            </div>

                            <button
                                type="submit"
                                className="new-product-button"
                            >
                                CREATE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default NewProduct;
