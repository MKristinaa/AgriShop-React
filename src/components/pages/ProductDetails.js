import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import { Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../actions/productActons';
import { addItemToCart } from '../../actions/cardActions';

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null); // Koristi null umesto niza za početnu vrednost
  const { id } = useParams();

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
    if (quantity >= (product ? product.stock : 0)) return;
    setQuantity(prevQty => prevQty + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity(prevQty => prevQty - 1);
  };

  if (!product) return <div>Loading...</div>; // Dodaj loading state ako je potrebno

  return (
    <div className='container'>
      <div className='top'>
        <div className='top-text'>Product</div>
        <div className="row d-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <Carousel pause='hover'>
              {product.images && product.images.map(image => (
                <Carousel.Item key={image.public_id}>
                  <img className="d-block w-100" src={image.url} alt={product.name} />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">Product # {product._id}</p>
            <hr />
            <div className="rating-outer">
              <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
            <hr />
            <p id="product_price">${product.price}</p>
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
              <input type="number" className="form-control count d-inline" value={quantity} readOnly />
              <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
            </div>
            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0} onClick={addToCart}>Add to Cart</button>
            <hr />
            <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
            <hr />
            <h4 className="mt-2">Description:</h4>
            <p>{product.description}</p>
            <hr />
            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
