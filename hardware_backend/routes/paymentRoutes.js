const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { processPayment } = require('../controllers/paymentController');

const router = express.Router();

router.post('/', protect, processPayment);

module.exports = router;