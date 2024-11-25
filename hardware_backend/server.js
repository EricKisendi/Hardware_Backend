require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const { seedDatabase } = require('./seed'); // Import seed logic
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const notFoundMiddleware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error-handler');

// Connect to MongoDB
connectDB();

// Conditional seeding logic
if (process.env.SEED_DB === 'true') {
    seedDatabase();
}

// Middleware
app.use(express.json());
app.use(cors());

// Route handling
app.use('/api/products', productRoutes);

// Error handling middleware (should come last)
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));