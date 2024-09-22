import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetails } from '../../actions/productActons';
import { addItemToCart } from '../../actions/cardActions';

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // Uvezi useNavigate

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
    navigate(-1); // Vraća na prethodnu stranicu
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
          <div className="stockCounter">
            <button className="btn minus" onClick={decreaseQty}>-</button>
            <input type="number" className="form-control count" value={quantity} readOnly />
            <button className="btn plus" onClick={increaseQty}>+</button>
          </div>
          <button type="button" id="cart_btn" className="btn add-to-cart" disabled={product.stocks === 0} onClick={addToCart}>Add to Cart</button>
          <hr className='border' />
          <p>Status: <span id="stock_status" className={product.stocks > 0 ? 'greenColor' : 'redColor'}>{product.stocks > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
          <hr className='border' />
          <h4 className="mt-2">Description:</h4>
          <p>{product.description}</p>
          <hr className='border' />
          <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
