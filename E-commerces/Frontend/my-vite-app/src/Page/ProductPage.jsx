import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsById } from '../api/products';
import { addItemsToCart } from "../api/order";
import { useCart } from '../CartContext';
import './ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const { updateCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductsById(id);
                setProduct(response.data);
                setTotalPrice(response.data.price); // Initialize total price
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product) {
            setTotalPrice(product.price * quantity); // Update total price whenever quantity changes
        }
    }, [quantity, product]);

    if (!product) return <div>Loading.....!!!</div>;

    const handleAddToCart = async () => {
        const userId = sessionStorage.getItem('id');
        try {
            await addItemsToCart({ userId, productId: id, quantity });
            updateCart();
                } catch (error) {
            console.error("Problem adding item to cart:", error);
        }
    };

    return (
        <div className="product-page">
            <img src={product.imageurl} alt={product.name} className="product-image" />
            <div className="product-info">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <h2>Price: ${product.price}</h2>
                <div className="quantity-control">
                    <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <h3>Total: ${totalPrice.toFixed(2)}</h3> {/* Display total price */}
                <button onClick={handleAddToCart} className="add-to-cart-button">Add to cart</button>
            </div>
        </div>
    );
};

export default ProductPage;
