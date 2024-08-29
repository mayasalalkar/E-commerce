import axios from "axios";

const API_URL = "http://localhost:5000/api/orders/";

export const getOrder = () => {
    return axios.get(API_URL);
};

export const getOrderById = (id) => {
    return axios.get(API_URL + id);
};

export const createOrder = (order) => {
    return axios.post(API_URL, order);
};

export const getCartItems = async (userId) => {
    console.log(`Fetching cart items for user: ${userId}`);
    return await axios.get(`${API_URL}cart/${userId}`);
};

export const updateCartItemQuantity = async (cartData) => {
    console.log(`Updating cart item quantity with data: `, cartData);
    return await axios.post(`${API_URL}cart/update`, cartData);
};

export const removeCartItem = async (cartData) => {
    console.log(`Removing cart item with data: `, cartData);
    return await axios.post(`${API_URL}cart/remove`, cartData);
};

export const addItemsToCart = async (cartData) => {
    console.log(`Adding items to cart with data: `, cartData);
    return await axios.post(`${API_URL}cart/add`, cartData);
};
