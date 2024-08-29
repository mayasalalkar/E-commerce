const Order = require('../models/Order');
const Product=require('../models/Product')
const User = require('../models/User');

const createOrder = async (req, res) => {
    try {
        const { user, products, totalAmount } = req.body;

        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(existingUser);
        console.log(req.body);
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
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const orders = await Order.find({ user: req.user.id }).populate('products.product');
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);  
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
        console.log(userId,productId)

       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

       
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

        
        order.totalAmount = order.products.reduce((total, item) => {
            return total + (product.price * item.quantity);
        }, 0);

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error adding item to cart:', error); // Log the error for debugging
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
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Error fetching cart items' });
    }
};
const removeItemFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
            console.log(userId,productId)
        
        let order = await Order.findOne({ user: userId, status: 'cart' }).populate('products.product');

        if (!order) {
            return res.status(404).json({ error: 'Cart not found' });
        }

       
        const itemIndex = order.products.findIndex(item => item.product._id.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        
        order.products.splice(itemIndex, 1);

        
        order.totalAmount = order.products.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        const savedOrder = await order.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        console.error('Error removing item from cart:', error); // Log the error for debugging
        res.status(500).json({ error: 'Error removing item from cart.' });
    }
};
const updateCartItemQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        let order = await Order.findOne({ user: userId, status: 'cart' }).populate('products.product');

        if (!order) {
            return res.status(404).json({ error: 'Cart Not Found.' });
        }

        const itemIndex = order.products.findIndex(item => item.product._id.toString() === productId);

        if (itemIndex > -1) {
            order.products[itemIndex].quantity = quantity;

            const savedOrder = await order.save();

            res.status(200).json(savedOrder);
        } else {
            res.status(404).json({ error: 'Item not in cart' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error Updating Cart Item Quantity' });
    }
};


module.exports={createOrder,getOrders,updateOrder,getCartItems,addItemsToCart,removeItemFromCart,updateCartItemQuantity}
