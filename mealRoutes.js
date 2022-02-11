const express = require("express");
const kitchenController = require("./Controllers/kitchenController");
const Router = express.Router();

// Router.route("/availableMeals").get(kitchenController.meals)
Router.route("/addmeals").post(kitchenController.addmeals);

module.exports = Router;
