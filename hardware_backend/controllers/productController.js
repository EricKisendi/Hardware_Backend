const Product = require('../models/Product');

// Get paginated products
const getProducts = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments();

        res.status(200).json({
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    console.log('Requested category:', req.params.category);
    // console.log('Category being searched:', decodedCategory);
    try {
        const decodedCategory = decodeURIComponent(category); // Decode category
        const products = await Product.find({
            category: { $regex: new RegExp(decodedCategory, 'i') }, // Case-insensitive regex match
        });

        if (products.length === 0) {
            return res.status(404).json({ message: `No products found for category: ${decodedCategory}` });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new product
const addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: 'Error adding product' });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: 'Error updating product' });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct,
};
