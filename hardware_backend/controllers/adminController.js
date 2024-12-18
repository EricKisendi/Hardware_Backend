const Product = require('../models/Product');
const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { protect } = require('../middlewares/authMiddleware');
const { authenticateAdmin } = require('../middlewares/authenticateAdmin');

// =============================
// Admin Login
// =============================
exports.adminLogin = async (req, res) => {

  const { username, password } = req.body;
  console.log('Username:', username);

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    console.log(`Input Password: '${password}'`);
    console.log(`Stored Hashed Password: '${admin.password}'`);
        
    console.log('Admin found:', admin);
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('Password match:', isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// =============================
// Product Management (Admin Only)
// =============================

// Add a new product (Admin Only)
exports.addProduct = [protect, authenticateAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}];

// Edit a product (Admin Only)
exports.editProduct = [protect, authenticateAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}];

// Delete a product (Admin Only)
exports.deleteProduct = [protect, authenticateAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}];

// =============================
// User Management (Admin Only)
// =============================

// Get all users (Admin Only)
exports.getUsers = [protect, authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}];
