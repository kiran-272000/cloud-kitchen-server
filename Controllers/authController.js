const jwt = require("jsonwebtoken");

const User = require("../Models/User-model");
const Cart = require("../Models/cartModel");
const AvailableMeals = require("../Models/Meals-model");

const signInToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = async (req, res) => {
  const data = req.body;

  const isUserexist = await User.find({ email: data.email });
  // console.log(isUserexist.length);
  if (!isUserexist.length) {
    try {
      const newUser = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });

      const token = signInToken(newUser._id);

      res.status(201).json({
        status: "success",
        token,
        userName: newUser.name,
        wishList: newUser.wishList,
      });
    } catch (err) {
      res.status(500).json({
        status: "Failed",
        message: err,
      });
    }
  } else {
    res.status(403).json({
      status: "failed",
      message: "User Already Exists",
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // 1) check if email exist
    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "please enter email and password",
      });
    }
    //2) check if user exists and password is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        message: "Invalid UserNAME OR Passwprd",
      });
    }

    //3) if ok, send token to client
    const token = signInToken(user._id);
    let cartItems = [];

    const cartItemId = await Cart.find({ userId: user._id });

    cartItems = await AvailableMeals.find({
      id: cartItemId.map((item) => item.mealId),
    });

    res.status(200).json({
      status: "success",
      token,
      userName: user.name,
      wishList: user.wishList,
      // id: user._id,
      // cart: cartItems,
    });
  } catch (err) {
    res.status(400).json({
      message: "Login Failed",
      error: err,
    });
  }
};
