const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema({
  orderId: { type: String, unique: true, required: true },
  address: { type: String },
  status: {
    type: String,
    enum: ['PREPARE', 'ON_COURSE', 'DELIVERED'],
    default: 'PREPARE',
  },
});

module.exports = mongoose.model('Order', Order);
