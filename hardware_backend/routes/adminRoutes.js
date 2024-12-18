const express = require('express');
const { adminLogin, addProduct, editProduct, deleteProduct, getUsers } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');
const { authenticateAdmin } = require('../middlewares/authenticateAdmin');

const router = express.Router();

// Admin login route
router.post('/login', adminLogin);

// Product management routes (Admin only)
router.post('/products', protect, authenticateAdmin, addProduct);
router.put('/products/:id', protect, authenticateAdmin, editProduct);
router.delete('/products/:id', protect, authenticateAdmin, deleteProduct);

// User management route (Admin only)
router.get('/users', protect, authenticateAdmin, getUsers);

module.exports = router;
