const mangoose = require("mongoose");

const date = new Date();

const orderSchema = new mangoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  orderedAt: {
    type: String,
    default: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
  },
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
