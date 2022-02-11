const mangoose = require("mongoose");

const availableMealSchema = new mangoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const AvailableMeals = mangoose.model("AvailableMeals", availableMealSchema);

module.exports = AvailableMeals;
