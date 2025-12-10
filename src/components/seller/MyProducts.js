import React, { useEffect, useState } from 'react';
import './MyProducts.css';
import { getProductsByUserId } from '../../actions/productActons'; 
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Search from '../pages/Search';
import Cookies from 'js-cookie';

function MyProducts() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resPerPage, setResPerPage] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [filteredProductsCount, setFilteredProductsCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [columns, setColumns] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const categories = ['Vegetables', 'Fruits', 'Grains', 'Legumes', 'Dairy', 'Meat', 'Beverages', 'Spices'];

  const { keyword } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const storedUser = Cookies.get('user');
  const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = loggedInUser ? loggedInUser._id : null;

  
  useEffect(() => {
    if (loggedInUser) setUser(loggedInUser);
  }, [storedUser]);

  
  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        if (userId) {
          const data = await getProductsByUserId(userId, selectedCategory, currentPage);
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
  }, [userId, currentPage, selectedCategory]);

  
  const updateColumns = () => {
    const width = window.innerWidth;
    if (width >= 1200) setColumns(4);
    else if (width >= 900) setColumns(3);
    else if (width >= 600) setColumns(2);
    else setColumns(1);
  };

  useEffect(() => {
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword || selectedCategory) count = filteredProductsCount;

  return (
    <div className='container'>
      
      {(user === null || user.role === 'seller' || user.role === 'user') && (
        <li className='nav-item'>
          <div className='cart'>
            <Link to='/cart' className='linkkkk'>
              <i className="fa-solid fa-basket-shopping"></i>
            </Link>
          </div>
        </li>
      )}


      <div className='top'>
        <div className='top-text'>My Products</div>
      </div>


      <div className='hamburger' onClick={() => setSidebarOpen(!sidebarOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>


      <div className={`content ${sidebarOpen ? 'sidebar-active' : ''}`}>
        
        <div className='right-side sidebar-left'>
          <div className='search-bar'>
            <Search />
          </div>

          <div className="categories-section">
            <h3 className='title-categories'>
              <i className="fa-solid fa-seedling"></i> Categories
            </h3>
            <div className="category-grid">
              
              <Link 
                to="/products"
                className="category-card"
                onClick={() => {
                  setSidebarOpen(false);
                  setCurrentPage(1);
                  setSelectedCategory('');
                }}
              >
                <i className="fa-solid fa-leaf"></i> <span>All</span>
              </Link>


              {categories.map(cat => (
                <Link 
                  key={cat} 
                  to={`/products?category=${cat}`} 
                  className="category-card"
                  onClick={() => {
                    setSidebarOpen(false);
                    setCurrentPage(1);
                    setSelectedCategory(cat);
                  }}
                >
                  <i className="fa-solid fa-leaf"></i> <span>{cat}</span>
                </Link>
              ))}
            </div>


            <button
              onClick={() => navigate('/admin/product')}
              className="all-products-btn all-btn"
              style={{ marginTop: '15px' }}
            >
              Add New Product
            </button>
          </div>
        </div>


        <div className='left-side products-right'>
          <div 
            className="product-grid"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {products && products.map((product) => (
              <div className="product-card" key={product._id}>
                <img className="product-img" src={product.image.url} alt={product.name} />
                <div className="product-body">
                  <h5 className="product-title">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </h5>
                  <p className="product-price">${product.price}</p>
                  <Link to={`/product/${product._id}`} className="all-products-btn view-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {resPerPage < count && (
            <div className='pagination'>
              <Pagination 
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={count}
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
      </div>
    </div>
  );
}

export default MyProducts;
