const express = require("express");
const cors = require("cors");

const app = express();

const mealRoutes = require("./mealRoutes");
const db = require("./db");

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send("API works");
});
app.use("/api/kitchen", mealRoutes);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
//   );
//   next();
// });

app.all("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: `Cannot find ${req.originalUrl} in this server`,
  });
});

module.exports = app;
