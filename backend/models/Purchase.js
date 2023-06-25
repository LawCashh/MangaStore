const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  titles: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
