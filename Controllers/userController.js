const jwt = require("jsonwebtoken");
const AvailableMeals = require("../Models/Meals-model");

const User = require("../Models/User-model");

exports.wishlist = async (req, res) => {
  const data = req.body;
  const decoded = jwt.verify(data.token, process.env.JWT_SECRET);

  try {
    const user = await User.findOne({ _id: decoded.id });

    const found = user.wishList.find((element) => element === data.mealId);
    let updatedWishlist = user.wishList;
    console.log(updatedWishlist);
    if (found) {
      updatedWishlist = updatedWishlist.filter((item) => item !== data.mealId);
    } else {
      updatedWishlist.push(data.mealId);
    }
    console.log(updatedWishlist);

    const updatedUser = await User.updateOne(
      { _id: decoded.id },
      { $set: { wishList: updatedWishlist } }
    );
    res.status(200).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {}
};

exports.getWishlist = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const user = await User.findOne({ _id: decoded.id });
    const wishListArray = user.wishList;

    res.status(200).send({
      wishListArray,
    });
  } catch (err) {}
};
