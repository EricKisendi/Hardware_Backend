// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/UserController'); // Import the controller functions

// User Signup Route
router.post('/signup', signup);

// User Login Route
router.post('/login', login);

module.exports = router;
