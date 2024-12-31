const express = require("express");
const productController = require("../controllers/product-controller");

const router = express.Router();

// Get all products
router.get("/products", productController.getAllProducts);

// Get a single product by ID
router.get("/products/:id", productController.getProductById);

router.get("/product/:id", productController.getProductById1);

// Create a new product
router.post("/products/", productController.createProduct);

// Update a product by ID
router.put("/products/:id", productController.updateProduct);

// Delete a product by ID
router.delete("/products/:id", productController.deleteProduct);

router.get("/categories", productController.getAllProductCategories);

router.get("/search/products", productController.searchProducts);
router.put("/products/:id/reviews", productController.addProductReview);

module.exports = router;
