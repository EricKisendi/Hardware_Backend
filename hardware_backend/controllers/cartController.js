const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add product to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [], total: 0 });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      cart.items.push({ product: productId, quantity });
    }

    let total = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (product) {
        total += item.quantity * product.price;
      }
    }
    cart.total = total;

    await cart.save();
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Filter out the product to remove it from the cart
    const filteredItems = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (filteredItems.length === cart.items.length) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Assign the filtered items back to the cart
    cart.items = filteredItems;

    // Recalculate the total using a loop to handle async operations properly
    let total = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (product) {
        total += item.quantity * product.price;
      }
    }

    cart.total = total;

    // Save the updated cart
    await cart.save();
    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Error removing from cart', error });
  }
};

// Update product quantity in cart
exports.updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid product or quantity' });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the product in the cart
    const item = cart.items.find((item) => item.product._id.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the quantity
    item.quantity = quantity;

    // Recalculate total
    cart.total = cart.items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);

    // Save the updated cart
    await cart.save();
    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    console.error('Update Cart Error:', error.message);
    res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
};


// Clear user's cart
exports.clearCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = [];
    cart.total = 0;

    await cart.save();
    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error });
  }
};
