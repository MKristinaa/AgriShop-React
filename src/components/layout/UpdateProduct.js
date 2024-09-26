import React, { Fragment, useState, useEffect } from 'react';
import { updateProduct, getProductDetails } from '../../actions/productActons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './UpdateProduct.css';

const UpdateProduct = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [base64Image, setBase64Image] = useState("");
    const [user, setUser] = useState(null);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stocks, setStocks] = useState(0);
    const [imageURL, setImageURL] = useState('');
    const [oldImage, setOldImage] = useState(''); 
    const [imagesPreview, setImagesPreview] = useState('');

    const categories = [
        'Vegetables',
        'Fruits',
        'Grains'
    ];

    const convertUrlToBase64 = async (imageUrl) => {
        const response = await fetch(imageUrl); 
        const blob = await response.blob(); 
        const reader = new FileReader();
    
        return new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob); 
        });
      };

    useEffect(() => {
        const fetchProductDetails = async () => {
            const productDetails = await getProductDetails(productId);
            if (productDetails) {
                setName(productDetails.product.name || '');
                setPrice(productDetails.product.price || 0);
                setDescription(productDetails.product.description || '');
                setCategory(productDetails.product.category || '');
                setStocks(productDetails.product.stocks || 0);
                setOldImage(productDetails.product.image || '');
            }
        };
        fetchProductDetails();

        if (oldImage && oldImage.url) {
            convertUrlToBase64(oldImage.url).then((base64) => {
              setBase64Image(base64); 
            });
          }


    }, [productId, oldImage.url]);

    const submitHandler = async (e) => {
        e.preventDefault();
    
        const data = {
            name,
            price,
            description,
            stocks,
            category,
            image: imageURL || base64Image
        };
    
        await updateProduct(productId, data);
        alert("Product successfully updated!");
        navigate(`/product/${productId}`);
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
                <div className='top-text update-top'>Update Product</div>
            </div>

            <div className="update-product-row">
                <div className="update-product-content">
                    <div className="update-product-form-wrapper">
                        <form className="update-product-form-container" onSubmit={submitHandler}>
                            <div className="update-product-form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="update-product-form-group">
                                <label htmlFor="price_field">Price</label>
                                <input
                                    type="number"
                                    id="price_field"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="update-product-form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea
                                    id="description_field"
                                    rows="8"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="update-product-form-group">
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

                            <div className="update-product-form-group">
                                <label htmlFor="stocks_field">Stocks</label>
                                <input
                                    type="number"
                                    id="stocks_field"
                                    value={stocks}
                                    onChange={(e) => setStocks(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='update-product-form-group'>
                                <div className='avatar'>
                                    <div className='update-product-form-group-image-preview'>
                                        {oldImage && <img src={oldImage.url} alt="Old Image" />}
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
                            </div>

                            <button
                                type="submit"
                                className="update-product-button"
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
