import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductDetails, deleteProduct, getProducts } from '../../actions/productActons';
import { addItemToCart } from '../../actions/cardActions';
import Cookies from 'js-cookie'; 
import { getUserDetails } from '../../actions/userActions';

function ProductDetails() {
  const [userId, setUserId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState(null);
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState(null);
  const [user, setUser] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = Cookies.get('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) { 
          setUser(parsedUser);
          setUserId(parsedUser._id);
        }
      }
    };

    fetchUserData();

    const fetchProduct = async () => {
      try {
        const data = await getProductDetails(id);
        setProduct(data.product);

        // Učitavanje prodavca
        const userData = await getUserDetails(data.product.user);
        setSeller(userData.user);

        // Učitavanje sličnih proizvoda iz iste kategorije
        const allProducts = await getProducts();
        const filtered = allProducts.products.filter(
          p => p.category === data.product.category && p._id !== data.product._id
        );
        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchUserData();
    fetchProduct();
  }, [id]);


  const deleteProductHandler = async (id) => {
    const response = await deleteProduct(id);

    if (response.success) {
      setMessage('Proizvod je uspešno obrisan!');
      const productsData = await getProducts();
      setProducts(productsData.products);
    } else {
      setMessage('Greška prilikom brisanja proizvoda.'); 
    }
  };

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

  if (!product) return <div>Loading...</div>;

  return (
    <div className='pd-container'>
      {/* CART */}
            {(user === null || user.role === 'seller' || user.role === 'user') && (
              <li className='nav-item'>
                <div className='cart'>
                  <Link to='/cart' className='linkkkk'>
                    <i className="fa-solid fa-basket-shopping"></i>
                  </Link>
                </div>
              </li>
            )}

            
      <div className="pd-product-card">
        <div className="pd-product-details">
          <div className="pd-product-image">
            <img key={product.image.public_id} src={product.image.url} alt={product.name} />
          </div>

          <div className="pd-product-info">
            {(userId === product.user) ? (
              <div className="pd-my-product-section">
                <p className='pd-my-product-title'>My Product</p>
                <div className="pd-my-product-actions">
                  <Link to={`/admin/product/${product._id}`} className="pd-btn-update">
                    <i className="fa fa-pencil"></i> Update
                  </Link>
                  <button className="pd-btn-delete" onClick={() => deleteProductHandler(product._id)}>
                    <i className="fa fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="pd-seller-container">
                {seller ? (
                  <div className="pd-seller-info">
                    {seller.avatar && (
                      <img src={seller.avatar.url} alt="Seller" className="pd-seller-image" />
                    )}
                    <p className="pd-seller-name">{seller.name} {seller.lastname}</p>
                  </div>
                ) : (
                  <p>Loading seller information...</p>
                )}
              </div>
            )}

            <p className='pd-name'>{product.name}</p>

            <h4>Description:</h4>
            <p className='pd-description'>{product.description}</p>

            <h4>Price:</h4>
            <p className='pd-price'>{product.price}€</p>

            <hr className='pd-border' />

            <p>Status: 
              <span className={`pd-stock-status ${product.stocks > 0 ? 'pd-green' : 'pd-red'}`}>
                {product.stocks > 0 ? ' In Stock' : ' Out of Stock'}
              </span>
            </p>

            {(user === null || user.role === 'seller' || user.role === 'user' ) && (
              <>
                <div className="pd-stockCounter">
                  <button className="pd-btn-minus" onClick={decreaseQty}><i className="fas fa-minus"></i></button>
                  <input type="number" className="pd-count" value={quantity} readOnly />
                  <button className="pd-btn-plus" onClick={increaseQty}><i className="fas fa-plus"></i></button>
                </div>
                <button type="button" className="pd-add-to-cart" disabled={product.stocks === 0} onClick={addToCart}>
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="pd-related-products">
          <h3>You may also like</h3>
          <div className="pd-related-grid">
            {relatedProducts.map(p => (
              <Link to={`/product/${p._id}`} key={p._id} className="pd-related-card">
                <img src={p.image.url} alt={p.name} />
                <p className="pd-related-name">{p.name}</p>
                <p className="pd-related-price">{p.price}€</p>
              </Link>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
}

export default ProductDetails;
