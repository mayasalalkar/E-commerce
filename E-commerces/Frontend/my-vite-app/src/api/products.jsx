import axios  from "axios";


const API_URL= `http://localhost:5000/api/products/`;



export const getProducts=()=>{
    return axios.get(API_URL);
};

    export const getProductsById =(id)=>{
        return axios.get(API_URL+id);
    }
    export const createProduct =async(prodcutData)=>{
        return await axios.post(API_URL,prodcutData);
    }