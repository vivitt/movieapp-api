const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const initialize = require("../config/passport-config");
const passport = require("passport");
const errorController = require("./errorController");
const { send } = require("express/lib/response");

initialize(passport);

function getUser(req, res) {
  res.status(200).json({
    email: req.user.email,
    name: req.user.name,
  });
}
async function registerNewUser(req, res, next) {
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).send({
      email: user.email,
      name: user.name,
      pass: user.password,
    });
  } catch (err) {
    errorController(err, req, res, next);
  }
}

function loginUser(req, res, next) {
  passport.authenticate("local", function (err, user) {
    if (err || !user) {
      res
        .status(401)
        .send({ success: false, message: "Incorrect username or password." });
    } else {
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          email: user.email,
          name: user.name,
        });
      });
    }
  })(req, res, next);
}

function logoutUser(req, res) {
  req.logOut();
  res.clearCookie("connect.sid", { path: "/" });
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send();
  });
}

module.exports = { getUser, registerNewUser, loginUser, logoutUser };
