import React, { useEffect, useState } from 'react';
import './MyProducts.css';
import { getProductsByUserId } from '../../actions/productActons'; 
import { Link, useParams, useLocation  } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Search from '../pages/Search';
import Cookies from 'js-cookie'; 
import { Button } from 'react-bootstrap';

function MyProducts() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resPerPage, setResPerPage] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [filteredProductsCount, setFilteredProductsCount] = useState(0);

  const categories = [
    'Vegetables',
    'Fruits',
    'Grains'
  ];

  const { keyword } = useParams();
  const location = useLocation();
  const productName = location.state?.productName;

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  
  const storedUser = Cookies.get('user');
  const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = loggedInUser ? loggedInUser._id : null;

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = Cookies.get('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) { 
          setUser(parsedUser);
        } else {
          console.error('No user ID found in stored user data.');
        }
      }
    };

    fetchUserData();

    const fetchUserProducts = async () => {
      try {
        if (userId) {
          const data = await getProductsByUserId(userId);
          setProducts(data.products);
          setResPerPage(data.resPerPage);
          setProductsCount(data.productCount);
          setFilteredProductsCount(data.filteredProductsCount);
        }
      } catch (error) {
        console.error("Error fetching user's products:", error);
      }
    };

    fetchUserProducts();

  }, [currentPage, userId]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <div className='container'>

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

          
      <div className='top'>
        <div className='top-text'>Products</div>
      </div>

      <div className='content'>
        <div className='left-side'>

        <div className="product-grid">
        {products && products.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              className="product-img"
              src={product.image.url}
              alt={product.name}
              width={150}
            />
            <div className="product-body">
              <h5 className="product-title">
                <Link to={`/product/${product._id}`}>{product.name}</Link>
              </h5>
              
              <p className="product-price">${product.price}</p>
              <Link to={`/product/${product._id}`} className="view-btn">View Details</Link>
            </div>
          </div>
        ))}
      </div>

      {resPerPage <= count && (
        <div className='pagination'>
          <Pagination 
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText={'Next'}
            prevPageText={'Prev'}
            firstPageText={'First'}
            lastPageText={'Last'}
            itemClass='page-item'
            linkClass='page-link'
          />
        </div>
      )}

        </div>

        
        <div className='line'></div>
        <div className='right-side'>
          <div className='search-bar'>
            <Search />
          </div>

          <h3 className='title-categories'>Categories</h3>
          <ul>
            {categories.map(category => (
              <li
                style={{
                  cursor: 'pointer',
                  listStyleType: 'none'
                }}
                key={category}
              >
                <Link to={`/product?category=${category}`} className="category">
                  {category}
                </Link>
              </li>
            ))}
          </ul>

          <div className='add-div'>
            <Link to={'/admin/product'} className='add-link'>Add New Product</Link>
          </div>

          
        {/* <div>
            {productName && <h1>Product created: {productName}</h1>}
        </div> */}
        </div>
      </div>
      
    </div>
  );
}

export default MyProducts;
