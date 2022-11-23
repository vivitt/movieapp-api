const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minlength: [2, "Username must be at least 2 characters"],
    maxlength: [20, "Username must be less than 20 characters"],
  },
  email: {
    type: String,
    unique: [true, "An account with that email allready exists"],
    required: [true, "Please enter an email"],
    validate: [validator.isEmail, "Please enter a valid email format"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],

    minLength: [5, "Password is too short!"],
  },
  picture: {
    type: String, //as it will be a path to the picture
  },
  favGenres: [
    {
      type: String,
      default: [],
    },
  ],

  favMovies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      default: [],
    },
  ],
});

//schema middleware to apply before saving
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

module.exports = new mongoose.model("User", userSchema);
