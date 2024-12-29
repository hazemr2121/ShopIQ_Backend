const mongoose = require("mongoose");
const mongooseSequence = require("mongoose-sequence");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    //required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    // required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },

  reviews: [
    {
      rating: {
        type: Number,
        // required: true,
      },
      comment: {
        type: String,
        // required: true,
      },
      date: {
        type: Date,
        // required: true,
      },
      reviewerName: {
        type: String,
        // required: true,
      },
      reviewerEmail: {
        type: String,
        // required: true,
      },
    },
  ],

  images: [String],
  thumbnail: {
    type: String,
    //required: true,
  },
});

productSchema.plugin(mongooseSequence(mongoose), {
  inc_field: "id",
  start_seq: 151,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
