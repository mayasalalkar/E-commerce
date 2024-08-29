import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCartItems, updateCartItemQuantity, removeCartItem } from "../api/order";
import './CartPage.css';

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            const userId = sessionStorage.getItem('id');
            if (userId) {
                const response = await getCartItems(userId);
                console.log("Cart items fetched:", response.data.products);  // Log the fetched cart items
                setCart(response.data.products || []);
            } else {
                navigate('/login');
            }
        };
        fetchCartItems();
    }, [navigate]);

    const handleItemClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    const handleQuantityChange = async (productId, quantity) => {
        if (quantity < 1) return;
        const userId = sessionStorage.getItem('id');
        await updateCartItemQuantity({ userId, productId, quantity });
        const response = await getCartItems(userId);
        setCart(response.data.products || []);
    };

    const handleRemoveItem = async (productId) => {
        const userId = sessionStorage.getItem('id');
        await removeCartItem({ userId, productId });
        const response = await getCartItems(userId);
        setCart(response.data.products || []);
    };

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty. Add items to your cart to make this amazing.</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.product._id} className="cart-item">
                            <img src={item.product.imageurl} alt={item.product.name} onClick={() => handleItemClick(item.product._id)} />
                            <div className="cart-item-details">
                                <h3>{item.product.name}</h3>
                                <p>Price: ${item.product.price}</p>
                                <div className="quantity-control">
                                    <button onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}>-</button>
                                    <span style={{ backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px" }}>
                                         {item.quantity}
                                        </span>

                                    <button onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}>+</button>
                                </div>
                                <p>Total: ${(item.product.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => handleRemoveItem(item.product._id)}>Remove from cart</button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h3>Net Total: ${calculateTotal()}</h3>
                        <button className="checkout-button">Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
