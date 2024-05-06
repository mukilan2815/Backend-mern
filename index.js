const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const loginRouter = require("./Router/Login");
const registerRouter = require("./Router/Register");
<<<<<<< HEAD
const productsRouter = require("./Router/Products");
=======
>>>>>>> 712382af609590c787f08bc05a54c55db294133f

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT, () => {
<<<<<<< HEAD
      console.log("Server is running on port", process.env.PORT);
=======
      console.log("Server is running on port",process.env.PORT);
>>>>>>> 712382af609590c787f08bc05a54c55db294133f
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

app.use(cors());
app.use(express.json());

app.use("/api", loginRouter);
app.use("/api", registerRouter);
<<<<<<< HEAD
app.use("/api", productsRouter);
=======
>>>>>>> 712382af609590c787f08bc05a54c55db294133f
