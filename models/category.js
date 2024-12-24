const mongoose = require("mongoose");

let categorySchema = new mongoose.Schema({
  categories: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Category", categorySchema);
