const express = require('express');
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
  clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Cart routes
router.post('/add', protect, addToCart);          // Add product to cart
router.get('/', protect, getCart);                // Get user's cart
router.delete('/remove', protect, removeFromCart); // Remove product from cart
router.put('/update', protect, updateCart);      // Update product quantity in cart
router.delete('/clear', protect, clearCart);     // Clear user's cart

module.exports = router;
