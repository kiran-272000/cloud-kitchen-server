const mangoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = mangoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your Email"],
    unique: [true, "Email ID already exist"],
    lowercae: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please Confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords does not match",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mangoose.model("User", userSchema);

module.exports = User;
