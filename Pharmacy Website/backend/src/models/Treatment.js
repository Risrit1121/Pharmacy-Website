const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    duration: String,
    benefits: [String],
    procedure: String,
    image: String,
    category: String,
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

treatmentSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Treatment', treatmentSchema);
