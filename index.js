const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const loginRouter = require("./Router/Login");
const registerRouter = require("./Router/Register");
const productsRouter = require("./Router/Products");
const filterRouter = require("./Router/filter");
const cartRouter = require("./Router/Cart");

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

app.use(cors());
app.use(express.json());

app.use("/api", loginRouter);
app.use("/api", registerRouter);
app.use("/api", productsRouter);
app.use("/api", filterRouter);
app.use("/api", cartRouter);
