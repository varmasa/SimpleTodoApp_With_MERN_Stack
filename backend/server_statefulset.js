require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const mongoURI = process.env.MONGO_URI;

const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});