const mangoose = require("mongoose");

const mealSchema = new mangoose.Schema({
  mealId: String,
  amount: Number,
});

const cartSchema = new mangoose.Schema({
  userId: String,
  cart: [mealSchema],
});

const Cart = mangoose.model("Cart", cartSchema);

module.exports = Cart;
