const express = require("express");
const orderController = require("../controllers/order-controller");

const router = express.Router();

// Create a new order
router.post("/orders", orderController.createOrder);

// Get all orders
router.get("/orders", orderController.getAllOrders);

// Get a specific order by ID
router.get("/orders/:orderId", orderController.getOrderById);

// Update an order by ID
router.put("/orders/:orderId", orderController.updateOrderById);

// Delete an order by ID
router.delete("/orders/:orderId", orderController.deleteOrderById);

module.exports = router;
