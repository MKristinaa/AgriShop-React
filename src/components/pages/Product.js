import React, { useEffect, useState } from 'react';
import './Product.css';
import { getProducts } from '../../actions/productActons';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
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
  const [currentCategory, setCurrentCategory] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false); // kontrola sidebar-a

  const categories = [
    'Vegetables',
    'Fruits',
    'Grains',
    'Dairy Products',
    'Meat & Poultry',
    'Honey & Beekeeping Products',
    'Herbs & Spices',
    'Nuts & Seeds',
    'Beverages',
    'Others'
  ];

  const { keyword } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const categoryFromURL = searchParams.get('category');

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser) setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (categoryFromURL) {
      setCurrentCategory(categoryFromURL);
    } else {
      setCurrentCategory('');
    }
  }, [categoryFromURL]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(keyword, currentPage, currentCategory); 
        setProducts(data.products); 
        setResPerPage(data.resPerPage);
        setProductsCount(data.productCount);
        setFilteredProductsCount(data.filteredProductsCount);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts(); 
  }, [currentPage, keyword, currentCategory]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword || currentCategory) count = filteredProductsCount;

  return (
    <div className='container'>

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

      {/* TOP BANNER */}
      <div className='top'>
        <div className='top-text'>Products</div>
      </div>

      {/* HAMBURGER dugme */}
      <div className={`hamburger ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(!sidebarOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`content ${sidebarOpen ? 'sidebar-active' : ''}`}>
        {/* SIDEBAR LEVO */}
        <div className='right-side sidebar-left'>
          <div className='search-bar'>
            <Search />
          </div>

          <div className="categories-section">
            <h3 className='title-categories'>
              <i className="fa-solid fa-seedling"></i> Categories
            </h3>
            <div className="category-grid">
              {categories.map(cat => (
                <Link 
                  key={cat}
                  to={`/product?category=${cat}`} 
                  className="category-card"
                  onClick={() => setSidebarOpen(false)} // zatvori sidebar kad klikneš
                >
                  <i className="fa-solid fa-leaf"></i>
                  <span>{cat}</span>
                </Link>
              ))}
            </div>

            <button
              onClick={() => {
                setCurrentCategory('');
                setCurrentPage(1);
                navigate('/product');
                setSidebarOpen(false);
              }}
              className="all-products-btn all-btn"
            >
              All Products
            </button>
          </div>
        </div>

        {/* PROIZVODI DESNO */}
        <div className='left-side products-right'>
          <div className="product-grid">
            {products && products.map((product) => (
              <div className="product-card" key={product._id}>
                <img
                  className="product-img"
                  src={product.image.url}
                  alt={product.name}
                />
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

export default Product;
