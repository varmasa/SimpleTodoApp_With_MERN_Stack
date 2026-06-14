require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbname = process.env.MONGO_DBNAME;

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;

const mongoURI =
  `mongodb://${user}:${password}@${host}:${port}/${dbname}?authSource=admin`;

const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

mongoose.connect(mongoURI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// Backend health
app.get("/api", (req, res) => {
  res.status(200).json({
    backend: "UP"
  });
});


// DB health
app.get("/db", (req, res) => {

  const state = mongoose.connection.readyState;

  res.status(
    state === 1 ? 200 : 500
  ).json({
    database:
      state === 1
        ? "CONNECTED"
        : "DISCONNECTED",

    mongodb_host: host,
    mongodb_port: port,
    mongodb_db: dbname
  });

});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
