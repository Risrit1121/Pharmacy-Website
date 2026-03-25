const router = require('express').Router();
const Treatment = require('../models/Treatment');
const { protect, admin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const treatments = await Treatment.find();
  res.json(treatments);
});

router.get('/:slug', async (req, res) => {
  const t = await Treatment.findOne({ slug: req.params.slug });
  if (!t) return res.status(404).json({ message: 'Not found' });
  res.json(t);
});

router.post('/', protect, admin, async (req, res) => {
  try {
    const t = await Treatment.create(req.body);
    res.status(201).json(t);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  const t = await Treatment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(t);
});

router.delete('/:id', protect, admin, async (req, res) => {
  await Treatment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
