// Cart is managed client-side (localStorage), this route handles server-side cart sync
const router = require('express').Router();
const Product = require('../models/Product');

// Validate cart items against current prices/stock
router.post('/validate', async (req, res) => {
  try {
    const { items } = req.body;
    const validated = [];
    for (const item of items) {
      const product = await Product.findById(item.product).select('name price discountPrice stock images isAvailable');
      if (product && product.isAvailable) {
        validated.push({ ...item, currentPrice: product.discountPrice || product.price, stock: product.stock, name: product.name, image: product.images[0] });
      }
    }
    res.json(validated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
