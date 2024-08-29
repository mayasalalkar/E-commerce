const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrder, getCartItems, addItemsToCart } = require('../controllers/orderController');

router.post('/orders', createOrder);


router.get('/orders', getOrders);


router.put('/orders/:id', updateOrder);

router.post('/cart/items', addItemsToCart);

router.get('/cart/:userId', getCartItems);

module.exports = router;
