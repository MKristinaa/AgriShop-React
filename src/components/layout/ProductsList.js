import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Sidebar from './Sidebar';
import { getProducts, deleteProduct } from '../../actions/productActons';

const ProductsList = ({ history }) => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState(null); // Za poruku

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await getProducts();
            setProducts(productsData.products);
        }

        fetchProducts();
    }, []);

    const setTableProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        };

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: <Fragment>
                    <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            });
        });

        return data;
    }

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
    }
    
    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Products</h1>

                        {message && <div className="alert alert-info">{message}</div>} {/* Prikaz poruke */}

                        <MDBDataTable
                            data={setTableProducts()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
}

export default ProductsList;
