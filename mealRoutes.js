const express = require("express");
const kitchenController = require("./Controllers/kitchenController");
const Router = express.Router();

// Router.route("/availableMeals").get(kitchenController.meals)
Router.route("/addmeals").post(kitchenController.addmeals);
Router.route("/meals").get(kitchenController.getAllMeals);
Router.route("/cart").post(kitchenController.cart);

module.exports = Router;
