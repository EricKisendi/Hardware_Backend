exports.processPayment = async (req, res) => {
    const { cardNumber, expiryDate, cvv } = req.body;
  
    console.log('Payment details received:', req.body);
  
    try {
      // Mock payment processing logic
      if (!cardNumber || !expiryDate || !cvv) {
        return res.status(400).json({ message: 'Incomplete payment details.' });
      }
  
      // Simulate payment processing success
      res.status(200).json({ message: 'Payment processed successfully.' });
    } catch (error) {
      console.error('Payment error:', error.message);
      res.status(500).json({ message: 'Payment failed. Please try again.' });
    }
  };
  