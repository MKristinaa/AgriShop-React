import React, { Fragment, useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { newProduct } from '../../actions/productActons'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const NewProduct = ({ history }) => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [image, setImage] = useState('');  
    const [imagePreview, setImagePreview] = useState('');  
    const [userId, setUserId] = useState(null);

    const categories = [
        'Vegetables',
        'Fruits',
        'Grains'
    ]

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = Cookies.get('user');
            if (storedUser) {
              const parsedUser = JSON.parse(storedUser);
              try {
                setUserId(parsedUser._id);
              } catch (error) {
                console.error('Error loading user data:', error);
              }
            }
          };
      
          fetchUserData();
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();

        const data = {
            name: name,
            price: price,
            description: description,
            ratings: 4.5,
            image: image,  
            category: category,
            user: userId,
            stocks: stock
        }

        console.log(data);

        try {
            const response = await newProduct(data);
            console.log("Uspesno dodat proizvod!", response);
            navigate('/admin/products')
        } finally {
            setLoading(false);
        }
    }

    const onChange = e => {
        const file = e.target.files[0];  
    
        if (file) {
            const reader = new FileReader();
    
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(reader.result);
                    setImage(reader.result);  
                }
            };
    
            reader.readAsDataURL(file); 
        }
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
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Product</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category} >{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
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

                                    {imagePreview && (
                                        <img src={imagePreview} alt="Image Preview" className="mt-3 mr-2" width="55" height="52" />
                                    )}

                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default NewProduct;
