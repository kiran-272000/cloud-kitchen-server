const express = require("express");

const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/wishlist").post(userController.wishlist);
router.route("/getwishlist").get(userController.getWishlist);
module.exports = router;
