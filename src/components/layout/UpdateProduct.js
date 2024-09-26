import React, { Fragment, useState, useEffect } from 'react';
import { updateProduct, getProductDetails } from '../../actions/productActons';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateProduct.css';  // Assuming you'll create a custom CSS file for styling

const UpdateProduct = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stocks, setStocks] = useState(0); // Changed from ratings to stocks
    const [imageURL, setImageURL] = useState('');
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        'Vegetables',
        'Fruits',
        'Grains'
    ];

    useEffect(() => {
        const fetchProductDetails = async () => {
            const productDetails = await getProductDetails(productId);
            if (productDetails) {
                setName(productDetails.product.name || '');  
                setPrice(productDetails.product.price || 0);
                setDescription(productDetails.product.description || '');
                setCategory(productDetails.product.category || '');
                setStocks(productDetails.product.stocks || 0); // Changed from ratings to stocks
                setOldImages([productDetails.product.image] || []);
            }
        };
        fetchProductDetails();
    }, [productId]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const data = {
            name,
            price,
            description,
            stocks, // Changed from ratings to stocks
            image: imageURL || oldImages[0]?.url,  // Keep old image if no new image is provided
            category
        };

        await updateProduct(productId, data);
        alert("Product successfully updated!");
        navigate('/admin/products');
    };

    const onChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview([reader.result]);  // Preview image
                    setImageURL(reader.result);         // Store the image URL as a string
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Fragment>
            <div className='top'>
                <div className='top-text'>Update Product</div>
            </div>

            <div className="row">
                <div className="col-content">
                    <div className="form-wrapper">

                        <form className="form-container" onSubmit={submitHandler}>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input
                                    type="number"
                                    id="price_field"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea
                                    id="description_field"
                                    rows="8"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select
                                    id="category_field"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="stocks_field">Stocks</label>
                                <input
                                    type="number"
                                    id="stocks_field"
                                    value={stocks} // Changed from ratings to stocks
                                    onChange={(e) => setStocks(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='form-group'>
                                <label>Image</label>
                                <input
                                    type='file'
                                    name='product_image'
                                    id='product_image'
                                    onChange={onChange}
                                />
                                {oldImages && oldImages.map(img => (
                                    <img key={img.public_id} src={img.url} alt={img.public_id} width="55" height="52" />
                                ))}
                                {imagesPreview.map(img => (
                                    <img src={img} key={img} alt="Image Preview" width="55" height="52" />
                                ))}
                            </div>

                            <button
                                type="submit"
                                className="update-button"
                            >
                                UPDATE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProduct;
