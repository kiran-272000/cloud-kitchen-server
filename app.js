const express = require("express");

const app = express();

const mealRoutes = require("./mealRoutes");
const db = require("./db");

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send("API works");
});
app.use("/api/kitchen", mealRoutes);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: `Cannot find ${req.originalUrl} in this server`,
  });
});

module.exports = app;
