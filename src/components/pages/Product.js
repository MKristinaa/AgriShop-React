import React, { useEffect, useState } from 'react';
import './Product.css';
import { getProducts } from '../../actions/productActons';
import { Link, useParams, useLocation } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Search from './Search';
import Cookies from 'js-cookie';

function Product() {
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

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

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
    const fetchProducts = async () => {
      try {
        const data = await getProducts(keyword, currentPage, category); 
        setProducts(data.products); 
        setResPerPage(data.resPerPage);
        setProductsCount(data.productCount);
        setFilteredProductsCount(data.filteredProductsCount);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); 

  }, [currentPage, keyword, category]);

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
        </div>
      </div>

      
    </div>
  );
}

export default Product;
