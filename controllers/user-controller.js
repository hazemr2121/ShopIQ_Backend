const User = require("../models/user");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
const mongoose = require("mongoose");

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "wishlist cart.product orders.products.product"
    );
    console.log(user);
    console.log(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  const user = new User(req.body);
  console.log(user);

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get user's cart
exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("cart");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Add item to user's cart
exports.addToUserCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart.push(req.body.item);
    await user.save();

    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get user's wishlist
exports.getUserWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("wishlist");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to user's wishlist
exports.addToUserWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist.push(req.body.item);
    await user.save();

    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get user by email
exports.getUserByEmail = async (req, res) => {
  try {
    console.log(req.params.email);

    const user = await User.findOne({ email: req.params.email }).populate(
      "wishlist cart.product orders.products.product"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.body.action == "plus") {
      const item = user.cart.find((item) => item.product == req.body.product);
      item.quantity++;
    }
    if (req.body.action == "minus") {
      const item = user.cart.find((item) => item.product == req.body.product);
      if (item.quantity == 1) {
        user.cart = user.cart.filter(
          (item) => item.product != req.body.product
        );
      } else {
        item.quantity--;
      }
    }
    if (req.body.action != "plus" && req.body.action != "minus") {
      user.cart.push(req.body);
    }
    await user.save();
    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// delete from cart

exports.deleteFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter((item) => item.product != req.body.id);
    await user.save();
    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUserWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.body.action == "add") {
      user.wishlist.push(req.body.id);
    }
    if (req.body.action == "remove") {
      user.wishlist = user.wishlist.filter((item) => item != req.body.id);
    }
    await user.save();
    res.status(200).json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUserOrders = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    console.log(user.orders);
    user.orders.push(req.body);
    await user.save();
    return res.status(200).json(user.orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
