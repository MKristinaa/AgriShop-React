import axios from 'axios';

// Funkcija za dodavanje stavke u korpu
export const addItemToCart = async (id, quantity) => {
    try {

        const { data } = await axios.get(`http://localhost:4000/api/product/${id}`);
        const product = data.product;

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const itemIndex = cartItems.findIndex(item => item.product === product._id);
        
        if (itemIndex > -1) {
            cartItems[itemIndex].quantity += quantity;
        } else {
            cartItems.push({
                product: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0].url,
                stock: product.stock,
                quantity
            });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
};


export const removeItemFromCart = (id) => {

    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const updatedCartItems = storedCartItems.filter(item => item.product !== id);

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    return updatedCartItems;
}

export const saveShippingInfo = (data) => {
    
    localStorage.setItem('shippingInfo', JSON.stringify(data));

    return data;
}
