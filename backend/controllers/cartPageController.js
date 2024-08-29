const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/User');

const createOrder = async (req, res) => {
    try {
        const { user, products, totalAmount } = req.body;

        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        for (const item of products) {
            const existingProduct = await Product.findById(item.product);
            if (!existingProduct) {
                return res.status(404).json({ error: `Product with id ${item.product} not found` });
            }
        }

        const newOrder = new Order({ user, products, totalAmount });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Error creating order' });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('products.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders' });
    }
};

const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Error updating order' });
    }
};

const addItemsToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        let order = await Order.findOne({ user: userId, status: 'cart' });

        if (!order) {
            order = new Order({ user: userId, products: [], totalAmount: 0, status: 'cart' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const itemIndex = order.products.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            
            order.products[itemIndex].quantity += quantity;
        } else {
            
            order.products.push({ product: productId, quantity });
        }

        order.totalAmount += product.price * quantity;

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Error adding item to cart' });
    }
};

const getCartItems = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Order.findOne({ user: userId, status: 'cart' }).populate('products.product');
        
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart items' });
    }
};

module.exports = { createOrder, getOrders, updateOrder, getCartItems, addItemsToCart };
