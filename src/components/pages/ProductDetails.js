import React, { useEffect, useState } from 'react';
import './ProductDetails.css'
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../actions/productActons';

function ProductDetails( {route}) {
  const [product, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductDetails(id); 
        setProducts(data.product); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); 
}, []);

return (
    <div className='container'>
      <div className='top'>
        <div className='top-text'>Product</div>

       
          <div className={`col-sm-12 col-md-6 my-3`} key={product._id}>
            <div className="card p-3 rounded">
            
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <p>{product.name}</p>
                </h5>
                <div className="ratings mt-auto">
                  <div className="rating-outer">
                    <div
                      className="rating-inner"
                      style={{ width: `${(product.ratings / 5) * 100}% `}}
                    ></div>
                  </div>
                 </div>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        
      </div>
    </div>
  );
}
export default ProductDetails;