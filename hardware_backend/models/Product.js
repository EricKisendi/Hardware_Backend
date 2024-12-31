const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, default: 0 },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    isFeatured: { type: Boolean, default: false }, // Add this line to define the isFeatured field
});

module.exports = mongoose.model('Product', ProductSchema);