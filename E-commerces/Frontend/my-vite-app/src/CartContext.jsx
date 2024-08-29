import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCartItems } from './api/order';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            const userId = sessionStorage.getItem('id');
            if (userId) {
                const response = await getCartItems(userId);
                const items = response.data.products || [];
                setCart(items);
                setCartCount(items.length);
            }
        };
        fetchCartItems();
    }, []);

    const updateCart = async () => {
        const userId = sessionStorage.getItem('id');
        if (userId) {
            const response = await getCartItems(userId);
            const items = response.data.products || [];
            setCart(items);
            setCartCount(items.length);
        }
    };

    return (
        <CartContext.Provider value={{ cart, cartCount, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};
