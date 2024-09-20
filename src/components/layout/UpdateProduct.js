import React, { Fragment, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { updateProduct, getProductDetails } from '../../actions/productActons';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);
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
            console.log(productDetails)
            if (productDetails) {
                setName(productDetails.product.name || '');  
                setPrice(productDetails.product.price || 0);
                setDescription(productDetails.product.description || '');
                setCategory(productDetails.product.category || '');
                setRatings(productDetails.product.ratings || 0);
                setOldImages(productDetails.product.images || []);

            }
        };
        fetchProductDetails();
    }, [productId]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const data = {
            name: name,
            price: price,
            description: description,
            ratings: ratings,
            image: imageURL,  // Slanje URL-a slike kao stringa
            category: category
        };

        console.log(data);
        console.log("Product ID:", productId);

        await updateProduct(productId, data);
        alert("Uspesno ste update-ali prozvod!");
        navigate('/admin/products');
    };

    const onChange = (e) => {
        const files = Array.from(e.target.files);
        setImagesPreview([]); 
        setImageURL('');  

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview([reader.result]);  // Prikazivanje slike
                    setImageURL(reader.result);         // Čuvanje URL-a kao string
                }
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Product</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name || ''}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price || ''}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description_field"
                                        rows="8"
                                        value={description || ''}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select
                                        className="form-control"
                                        id="category_field"
                                        value={category || ''}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ratings_field">Ratings</label>
                                    <input
                                        type="text"
                                        id="ratings_field"
                                        className="form-control"
                                        value={ratings || ''}
                                        onChange={(e) => setRatings(e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Image</label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_image'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Image
                                        </label>
                                    </div>
                                    {oldImages && oldImages.map(img => (
                                        <img key={img.public_id} src={img.url} alt={img.public_id} className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Image Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                                </div>
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    UPDATE
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProduct;
