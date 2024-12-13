const Order = require('../models/Order');

// Controller to create an order
exports.createOrder = async (req, res) => {
  console.log('Order request received:', req.body); // Log the incoming request body
  try {
    const { address, items, total } = req.body;
    const userId = req.user.id;

    // Create a new order
    const newOrder = new Order({
      user: userId,
      items,
      total,
      address,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
};
