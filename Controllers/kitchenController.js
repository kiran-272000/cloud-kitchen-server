const AvailableMeals = require("../Models/Meals-model");

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
