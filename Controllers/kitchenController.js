const AvailableMeals = require("../Models/Meals-model");
const CartItem = require("../Models/Cart-model");
exports.addmeals = async (req, res) => {
  const data = req.body;
  const newMeal = await AvailableMeals.create(
    {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
    },
    function (err, newMeal) {
      if (err) return res.status(422).send(err);
      res.status(201).json({
        id: newMeal.id,
        name: newMeal.name,
        description: newMeal.description,
        price: newMeal.price,
      });
    }
  );
};

exports.getAllMeals = async (req, res) => {
  const meals = await AvailableMeals.find();

  res.status(200).json({
    status: "Success",
    results: meals.length,
    data: {
      meals,
    },
  });
};

exports.cart = async (req, res) => {
  const data = req.body;

  const order = await CartItem.create(
    {
      orderItems: {
        amount: data.orderItems.amount,
        id: data.orderItems.id,
      },
      user: {
        name: data.user.name,
        street: data.user.street,
        postalCode: data.user.postalCode,
        city: data.user.postalCode,
      },
    },
    function (err, newMeal) {
      if (err) return res.status(422).send(err);
      res.status(201).json({
        status: "success",
        message: "Order Added to the cart",
      });
    }
  );
};
