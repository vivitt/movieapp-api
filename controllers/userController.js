const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");

const app = express();
// const passport = require('passeport')
const userModel = require("../models/User");
const movieModel = require("../models/Movie");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

async function getFavorites(req, res) {
  try {
    let userID = req.user.id;
    const user = await userModel.findOne({ _id: userID }).populate("favMovies");
    const favUserMovies = user.favMovies;
    if (favUserMovies.length > 0) {
      return res.json({ favUserMovies });
    } else
      res.send({
        category: "",
        poster: "",
        title: "",
        plot: "",
        year: "",
        rating: "",
      });
  } catch (err) {
    console.log(err);
  }
}

async function addToFavorites(req, res) {
  try {
    let userId = req.user.id;
    let movie = await movieModel.findOne({ title: req.params.movie });
    let favmovie = await userModel.findOne({ favMovies: movie._id });
    if (!favmovie) {
      await userModel.updateOne(
        { _id: userId },
        { $push: { favMovies: movie._id } }
      );
      return res.status(200).json({
        title: req.params.movie,
        id: movie._id,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
async function removeFromFavorites(req, res) {
  try {
    let userId = req.user._id;
    let movie = await movieModel.findOne({ title: req.params.movie });
    await userModel.updateOne(
      { _id: userId },
      { $pull: { favMovies: movie._id } }
    );
    return res.status(200).json({
      title: req.params.movie,
      id: movie._id,
    });
  } catch (err) {
    console.log(err);
  }
}

async function modifyName(req, res) {
  try {
    let userId = req.user.id;

    await userModel.updateOne({ _id: userId }, { name: req.params.name });
    return res.status(200).json({
      name: req.params.name,
    });
  } catch (err) {
    console.log(err);
  }
}

//////MULTER UPLOAD

const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const uploadImg = () => (
  uploadupload.single("profileImg"),
  async (req, res, next) => {
    try {
      const url = req.protocol + "://" + req.get("host");
      let userId = req.user.id;
      await userModel.updateOne(
        { _id: userId },
        { picture: url + "/public/" + req.file.filename }
      );
      return res.status(200).json({
        message: "uploaded",
      });
    } catch (err) {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    }
  }
);

module.exports = {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  modifyName,
  uploadImg,
};
