const express = require('express')

const { getProduct, getProducts,createProduct, updateProduct, deleteProduct } = require('../controllers/productController');


const router =express. Router();



router.get('/', getProducts)



router.post('/', createProduct)
router.get('/:id', getProduct)


router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router;