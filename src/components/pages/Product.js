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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [columns, setColumns] = useState(4);

  const categories = [
    'Vegetables', 'Fruits', 'Grains', 'Dairy Products', 'Meat & Poultry',
    'Honey & Beekeeping Products', 'Herbs & Spices', 'Nuts & Seeds', 'Beverages', 'Others'
  ];

  const { keyword } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const categoryFromURL = searchParams.get('category');

  // Load user from cookies
  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser) setUser(parsedUser);
    }
  }, []);

  // Postavljanje kategorije iz URL-a
  useEffect(() => {
    if (categoryFromURL) setCurrentCategory(categoryFromURL);
    else setCurrentCategory('');
  }, [categoryFromURL]);

  // Fetch proizvoda
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

  // Dinamički broj kolona po širini ekrana
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

      {/* TOP DIV */}
      <div className='top'>
        <div className='top-text'>Products</div>
      </div>

      {/* HAMBURGER */}
      <div className='hamburger' onClick={() => setSidebarOpen(!sidebarOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* MAIN CONTENT */}
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
              {/* All kategorija kao prva */}
              <Link 
                to="/product"
                className="category-card"
                onClick={() => {
                  setCurrentCategory('');
                  setCurrentPage(1);
                  setSidebarOpen(false);
                }}
              >
                <i className="fa-solid fa-leaf"></i>
                <span>All</span>
              </Link>

              {/* Ostale kategorije */}
              {categories.map(cat => (
                <Link 
                  key={cat} 
                  to={`/product?category=${cat}`} 
                  className="category-card"
                  onClick={() => {
                    setCurrentCategory(cat);
                    setCurrentPage(1);
                    setSidebarOpen(false);
                  }}
                >
                  <i className="fa-solid fa-leaf"></i>
                  <span>{cat}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* PROIZVODI DESNO */}
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
                  <p className="product-price">{product.price}€</p>
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
