import axios from "axios";

const API_URL = 'http://localhost:5000/api/auth/';

export const login = (email, password) => {
    console.log(email,password)
    return axios.post(`${API_URL}login`, { email, password });
};

export const register = (name, email, password, role) => {
    return axios.post(`${API_URL}register`, { name, email, password, role });
};

export const updateUser = (userId, userData) => {
    return axios.put(`${API_URL}user/${userId}`, userData);
};

export const getUser = (id) => {
    return axios.get(`${API_URL}user/${id}`);
};
