const mangoose = require("mongoose");

const cartSchema = new mangoose.Schema({
  orderItems: {
    amount: Number,
    id: String,
  },
  user: {
    name: String,
    street: String,
    postalCode: String,
    city: String,
  },
});

const CartItem = mangoose.model("CartItem", cartSchema);

module.exports = CartItem;
