const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const mockData = require('./products.json');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

const seedDatabase = async () => {
    try {
        await Product.deleteMany(); // Clear existing data
        await Product.insertMany(mockData); // Insert mock data
        console.log('Mock data seeded successfully!');
        process.exit(); // Exit the process after seeding
    } catch (error) {
        console.error('Error seeding the database:', error.message);
        process.exit(1);
    }
};

module.exports = { seedDatabase, connectDB };
