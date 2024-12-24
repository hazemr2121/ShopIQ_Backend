const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);
