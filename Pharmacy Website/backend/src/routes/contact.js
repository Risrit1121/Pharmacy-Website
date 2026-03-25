const router = require('express').Router();
const Contact = require('../models/Contact');
const { protect, admin } = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ message: 'Message sent successfully', id: contact._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', protect, admin, async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

router.put('/:id', protect, admin, async (req, res) => {
  const c = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(c);
});

module.exports = router;
