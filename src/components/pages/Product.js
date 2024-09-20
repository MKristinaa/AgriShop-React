import React, { useEffect, useState } from 'react';
import './Product.css';
import { getProducts } from '../../actions/productActons';
import { Link, useParams, useLocation } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Search from './Search';

function Product() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resPerPage, setResPerPage] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [category, setCategory] = useState('');
  const [filtereProductsCount, setFilteredProducetsCount] = useState(0);

  const categories= [
        'Vegetables',
        'Fruits',
        'Grains'
  ]

  const { keyword } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(keyword, currentPage, category); 
        setProducts(data.products); 
        setResPerPage(data.resPerPage);
        setProductsCount(data.productCount);
        setFilteredProducetsCount(data.filtereProductsCount);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); 
  }, [currentPage, keyword, category]);

  function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if(keyword){
    count = filtereProductsCount;
  }


  return (
    <div className='container'>
        
        <div className='top'>
          <div className='top-text'>Products</div>
        </div>

        <div className='content'>
          <div className='left-side'>

          </div>
          
          <div className='line'></div>

          <div className='right-side'>

              <div className='search-bar'>
                <Search />
              </div>


                <h3 className='title-categories'>
                    Categories
                </h3>

                <ul className="pl-0">
                    {categories.map(category => (
                        <li
                            style={{
                                cursor: 'pointer',
                                listStyleType: 'none'
                            }}
                            key={category}
                            onClick={() => setCategory(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>

          </div>
        </div>

        

        {products && products.map((product) => (
          <div className={`col-sm-12 col-md-6 my-3`} key={product._id}>
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src={product.image}
                alt={product.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h5>
                <div className="ratings mt-auto">
                  <div className="rating-outer">
                    <div
                      className="rating-inner"
                      style={{ width: `${(product.ratings / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                </div>
                <p className="card-text">${product.price}</p>
                <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
              </div>
            </div>
          </div>
        ))}

        {resPerPage <= count && (
          <div className='d-flex justify-content-center mt-5'>
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
              linkClass='page-item'
            />
          </div>
        )}
    </div>
  );
}

export default Product;
