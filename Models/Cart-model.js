const mangoose = require("mongoose");

const orderSchema = new mangoose.Schema({
  name: String,
  price: Number,
  amount: Number,
});

const cartSchema = new mangoose.Schema({
  orderItems: [orderSchema],
  user: {
    name: String,
    street: String,
    postalCode: String,
    city: String,
  },
  userId: String,
});

const CartItem = mangoose.model("CartItem", cartSchema);

module.exports = CartItem;
