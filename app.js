const express = require("express");
const cors = require("cors");

const app = express();

const mealRoutes = require("./Routes/mealRoutes");
const userRoutes = require("./Routes/userRoutes");
const db = require("./db");

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send("API works");
});
app.use("/api/kitchen", mealRoutes);
app.use("/api/user", userRoutes);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: `Cannot find ${req.originalUrl} in this server`,
  });
});

module.exports = app;
