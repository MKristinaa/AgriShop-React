import React, { useEffect, useState } from 'react';
import './MyProducts.css';
import { getProductsByUserId } from '../../actions/productActons'; // Nova funkcija
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Cookies from 'js-cookie'; // Uzimanje kolačića

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resPerPage, setResPerPage] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  // Uzimanje korisnika iz kolačića
  const storedUser = Cookies.get('user');
  const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = loggedInUser ? loggedInUser._id : null;

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        if (userId) {
          const data = await getProductsByUserId(userId); // Izmenjena akcija za filtriranje proizvoda korisnika
          setProducts(data.products);
          setResPerPage(data.resPerPage);
          setProductsCount(data.productCount);
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

  return (
    <div className='container'>
      <div className='top'>
        <div className='top-text'>My Products</div>
      </div>

      <div className='content'>
        <div className='product-grid'>
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

        {resPerPage <= productsCount && (
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
    </div>
  );
}

export default MyProducts;
