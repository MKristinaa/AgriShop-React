import axios from 'axios';

// Kreiraj narudžbinu
export const createOrder = async (order) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }

        const { data } = await axios.post('http://localhost:4000/api/order/new', order, config);
        return data; 

    } catch (error) {
        console.error(error.response.data.message);
        return error.response.data.message;
    }
}

// Dohvati narudžbine trenutno prijavljenog korisnika
export const myOrders = async (id) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/api/orders/me/${id}`,  { withCredentials: true });
        return data.orders;

    } catch (error) {
        console.error(error.response.data.message);
        return error.response.data.message;
    }
}

// Dohvati detalje narudžbine
export const getOrderDetails = async (id) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/api/order/${id}`);
        return data.order;

    } catch (error) {
        console.error(error.response.data.message);
        return error.response.data.message;
    }
}

// Dohvati sve narudžbine - ADMIN
export const allOrders = async () => {
    try {
        const { data } = await axios.get(`http://localhost:4000/api/admin/orders`);
        return data; 

    } catch (error) {
        console.error(error.response.data.message);
        return error.response.data.message;
    }
}

// Ažuriraj narudžbinu - ADMIN
export const updateOrder = async (id, orderData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`http://localhost:4000/api/admin/order/${id}`, orderData, config);
        return data.success; 

    } catch (error) {
        console.error(error.response.data.message);
        return error.response.data.message;
    }
}

// Obriši narudžbinu - ADMIN
export const deleteOrder = async (id) => {
    try {
        const { data } = await axios.delete(`http://localhost:4000/api/admin/order/${id}`);
        return data.success; 

    } catch (error) {
        console.error(error.response.data.message);
        return error.response.data.message;
    }
}

