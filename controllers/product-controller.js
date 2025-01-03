const category = require("../models/category");
const Product = require("../models/product");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    console.log(req.query);
    var products = await Product.find();
    // if(req.query.page) {
    //   products = products.slice((req.query.page - 1) * 9, req.query.page * 9);
    // }
    if (req.query.category) {
      products = products.filter(
        (product) => product.category === req.query.category
      );
    }
    if (req.query.rating) {
      products = products.filter(
        (product) => Math.floor(product.rating) == req.query.rating
      );
    }
    if (req.query.priceFrom) {
      products = products.filter(
        (product) => product.price >= req.query.priceFrom
      );
    }
    if (req.query.priceTo) {
      products = products.filter(
        (product) => product.price <= req.query.priceTo
      );
    }
    res.status(200).json({ length: products.length, data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
exports.getProductById1 = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    console.log(product);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    console.log(productId);
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    console.log(productId);
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const deletedProduct = await Product.findOneAndDelete({
      id: req.params.id,
    });
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all product categories
exports.getAllProductCategories = async (req, res) => {
  try {
    const categories = await category.find();
    res.status(200).json(categories[0].categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    console.log(req.query);
    const products = await Product.find({
      title: { $regex: req.query.title, $options: "i" }, // Case-insensitive search
    }).select("thumbnail title price");
    if (!products)
      return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
  }
};

exports.addProductReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.reviews.push(req.body);
    await product.save();

    res.status(200).json(product.reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
