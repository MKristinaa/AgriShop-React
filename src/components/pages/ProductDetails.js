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
  const { id } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = Cookies.get('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) { 
          setUser(parsedUser)
          setUserId(parsedUser._id);
        } else {
          console.error('No user ID found in stored user data.');
        }
      }
    };

    fetchUserData();
    const fetchProduct = async () => {
      try {
        const data = await getProductDetails(id);
        setProduct(data.product);

        const userData = await getUserDetails(data.product.user);
        setSeller(userData.user);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const deleteProductHandler = async (id) => {
    const response = await deleteProduct(id);
    console.log(response); // Proveri odgovor

    if (response.success) {
      setMessage('Korisnik je uspešno obrisan!');
      // Ponovo učitaj proizvode
      const productsData = await getProducts();
      setProducts(productsData.products);
    } else {
      setMessage('Greška prilikom brisanja korisnika.'); // Postavi grešku
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

  const handleBackButton = () => {
    navigate(-1); // Vraća na prethodnu stranicu
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className='container'>
      {/* <button onClick={handleBackButton} className="back-button"><b>Back</b></button> */}

      
      <div className="product-details">
        <div className="product-image">
          <img key={product.image.public_id} src={product.image.url} alt={product.name} />
          
        </div>


        <div className="product-info">

        {(userId === product.user) ? (
            <div className="my-product-section">
              <p className='my-product-title'>My Product</p>
              <div className="my-product-actions">
                <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2 update-btn">
                  <i className="fa fa-pencil"></i> Update
                </Link>
                <button className="btn btn-danger py-1 px-2 delete-btn" onClick={() => deleteProductHandler(product._id)}>
                  <i className="fa fa-trash"></i> Delete
                </button>
              </div>
            </div>
          
          ) : (
            <div id="product_seller" className="seller-container">
              {seller ? (
                <>
                  <div className="seller-info">
                    {seller.avatar && (
                      <img src={seller.avatar.url} alt="Seller" className="seller-image" />
                    )}
                    <p className="seller-name">{seller.name} {seller.lastname}</p>
                  </div>
                </>
              ) : (
                <p>Loading seller information...</p>
              )}
            </div>

          )}<br></br>

          <p className='name'>{product.name}</p><br></br>

          <h4 className="mt-2">Description:</h4>
          <p className='description'>{product.description}</p><br></br>

          <h4 className="mt-2">Price:</h4>
          <p id="product_price">${product.price}</p><br></br>


          <hr className='border' />


          <p>Status: <span id="stock_status" className={product.stocks > 0 ? 'greenColor' : 'redColor'}>{product.stocks > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
          
          
      {(user === null || user.role === 'seller' || user.role === 'user' ) && (
          <>
            <div className="stockCounter">
              <button className="btn minus" onClick={decreaseQty}><i className="fas fa-minus"></i></button>
              <input type="number" className="form-control count" value={quantity} readOnly />
              <button className="btn plus" onClick={increaseQty}><i className="fas fa-plus"></i></button>
            </div>
            <button type="button" id="cart_btn" className="btn add-to-cart" disabled={product.stocks === 0} onClick={addToCart}>Add to Cart</button>
          </>
        )}
        </div>
      </div>
      {/* CART */}
      {(user === null || user.role === 'seller' || user.role === 'user' ) && (
          <li className='nav-item'>
              <div className='cart'>
                <Link to='/cart' className='linkkkk'>
                    <i className="fa-solid fa-basket-shopping"></i>
                </Link>
              </div>
          </li>
          )}

    </div>
  );
}

export default ProductDetails;
