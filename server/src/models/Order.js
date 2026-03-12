const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: String,
        price: Number,
        quantity: Number
      }
    ],
    totalPrice: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['Cash on delivery', 'Orange Money', 'Moov Money'],
      required: true
    },
    orderStatus: { type: String, default: 'Pending' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
