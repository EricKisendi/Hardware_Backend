const express = require('express');
const { adminLogin, addProduct } = require('../controllers/adminController');
const router = express.Router();

router.post('/login', adminLogin);
router.post('/add-product', addProduct);

module.exports = router;
