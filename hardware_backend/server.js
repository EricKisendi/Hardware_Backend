require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const { seedDatabase } = require('./seed'); // Import seed logic
const connectDB = require('./config/db');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

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
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
