import axios from 'axios';

export const getProducts = async (keyword = '', currentPage = 1, category = '') => {
    try {
        let data;

        if (category) {
            const response = await axios.get(`http://localhost:4000/api/products?keyword=${keyword}&page=${currentPage}&category=${category}`);
            data = response.data;
        } else {
            const response = await axios.get(`http://localhost:4000/api/products?keyword=${keyword}&page=${currentPage}`);
            data = response.data;
        }

        return data;
        
    } catch (error) {
        console.log(error.response?.data?.message || error.message);
        return error.response?.data?.message || error.message;
    }
}

export const getProductDetails = async (id) => {
    try {

        const { data } = await axios.get(`http://localhost:4000/api/product/${id}`)

        console.log(data.product);

        return data;
        
    } catch (error) {
        console.log(error.response?.data?.message || error.message);
        return error.response?.data?.message || error.message;
    }
}


export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`http://localhost:4000/api/product/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return await response.json(); 
    } catch (error) {
        console.error('Error deleting product:', error);
        return { success: false }; 
    }
}


export const newProduct = async (productData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`http://localhost:4000/api/product/new`, productData, config);

        return {
            success: true,
            data,
        };
    } catch (error) {
        
        return {
            success: false,
            message: error.response?.data?.message || 'An error occurred',
        };
    }
};


export const updateProduct = async (id, productData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.put(`http://localhost:4000/api/product/update/${id}`, productData, config);

        return data.success;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};


export const getProductsByUserId = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/products/user/${userId}`);
        const { data } = response;
        
        return {
            success: true,
            products: data.products
        };
    } catch (error) {
        console.error('Error fetching products by user:', error.response?.data?.message || error.message);
        return {
            success: false,
            message: error.response?.data?.message || error.message
        };
    }
};