const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

// Routes
router.get('/', getProducts); // Get all products
router.get('/:id', getProductById); // Get a product by ID
router.get('/category/:category', getProductsByCategory); // Get products by category
router.post('/', addProduct); // Add a new product
router.put('/:id', updateProduct); // Update a product by ID
router.delete('/:id', deleteProduct); // Delete a product by ID

module.exports = router;