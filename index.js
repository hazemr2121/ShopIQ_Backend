const express = require("express");
const mongoose = require("mongoose");
const app = express();
const productRouter = require("./routes/product-route");
const userRouter = require("./routes/user-route");
const orderRouter = require("./routes/order-route");

mongoose
  .connect("mongodb+srv://Hazemr:1475963@cluster0.ptv3a.mongodb.net/Store", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use(express.json());
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Run the server
