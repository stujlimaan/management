const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['Fashion', 'Clothes', 'Shoes', 'Jewelry'],
      required: true,
    },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
