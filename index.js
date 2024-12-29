const express = require("express");
const mongoose = require("mongoose");
const app = express();
const productRouter = require("./routes/product-route");
const userRouter = require("./routes/user-route");
const orderRouter = require("./routes/order-route");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config({ path: ".env" });

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

app.use((req, res, next) => {
  if (req.method !== "DELETE") {
    bodyParser.json()(req, res, next);
  } else {
    next();
  }
});

app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Run the server
