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
  console.log(data);
  try {
    const order = await CartItem.create(data);
    res.status(200).json({
      status: "Success",
      orders: {
        order: order,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};
