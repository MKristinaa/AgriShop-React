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
        console.log(error.response.data.message);
        return error.response.data.message;
    }
}
