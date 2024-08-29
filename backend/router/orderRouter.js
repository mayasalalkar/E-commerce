const express = require('express');
const {
    createOrder,
    getOrders,
    updateOrder,
    getCartItems,
    addItemsToCart,
    removeItemFromCart,
    updateCartItemQuantity
} = require('../controllers/orderController');

const router = express.Router();


router.post('/', createOrder);
router.get('/', getOrders);
router.put('/:id', updateOrder);
router.get('/cart/:userId', getCartItems);
router.post('/cart/add', addItemsToCart);
router.post('/cart/remove', removeItemFromCart);
router.post('/cart/update', updateCartItemQuantity); 

module.exports = router;
