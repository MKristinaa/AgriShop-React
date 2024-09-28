import React, { useEffect, useState } from 'react';
import './SingleProducts.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductDetails, deleteProduct, getProducts } from '../../actions/productActons';
import { addItemToCart } from '../../actions/cardActions';

function SingleProduct() {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [message, setMessage] = useState(null);
  const [products, setProducts] = useState([]);

  const deleteProductHandler = async (id) => {
    const response = await deleteProduct(id);
    console.log(response); 

    if (response.success) {
        setMessage('Korisnik je uspešno obrisan!');
        const productsData = await getProducts();
        setProducts(productsData.products);
    } else {
        setMessage('Greška prilikom brisanja korisnika.'); 
    }
}


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductDetails(id);
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();

    }, [id]);

    const addToCart = async () => {
        try {
        await addItemToCart(id, quantity);
        alert('Item Added to Cart');
        } catch (error) {
        console.error('Error adding item to cart:', error);
        }
    };

    const increaseQty = () => {
        if (quantity >= (product ? product.stocks : 0)) return;
        setQuantity(prevQty => prevQty + 1);
    };

    const decreaseQty = () => {
        if (quantity <= 1) return;
        setQuantity(prevQty => prevQty - 1);
    };

    const handleBackButton = () => {
        navigate(-1);
    };

    if (!product) return <div>Loading...</div>;
    
  return (
    <div className='container'>
      
      <button onClick={handleBackButton} className="back-button"><b>Back</b></button>

      <div className="product-details">
        <div className="product-image">
          <img key={product.image.public_id} src={product.image.url} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <hr className='border' />

          <p id="product_id">Product #{product._id}</p>
          <hr className='border' />

          <div className="rating-outer">
            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
          </div>

          <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          <hr className='border' />

          <h4 className="mt-2">Price:</h4>
          <p id="product_price">${product.price}</p>
          <hr className='border' />

          <p>Status: <span id="stock_status" className={product.stocks > 0 ? 'greenColor' : 'redColor'}>{product.stocks > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
          <hr className='border' />
          
          <h4 className="mt-2">Description:</h4>
          <p>{product.description}</p>
          <hr className='border' />


          <div>
            <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                <i className="fa fa-pencil"></i> Update
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                <i className="fa fa-trash"></i> Delete
            </button>
          </div>


        </div>
      </div>
    </div>
  );
}

export default SingleProduct
