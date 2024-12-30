const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserCart,
  updateUserWishlist,
  getUserByEmail,
  updateUserOrders,
} = require("../controllers/user-controller");

const router = express.Router();

// Controller functions (you need to implement these)

// Routes
router.get("/users", getAllUsers);
router.get("/userByEmail/:email", getUserByEmail);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/cart", updateUserCart);
router.put("/users/:id/wishlist", updateUserWishlist);
router.put("/users/:id/orders", updateUserOrders);

module.exports = router;
