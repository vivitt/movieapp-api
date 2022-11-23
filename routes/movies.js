const router = require("express").Router();
const moviesController = require("../controllers/moviesController");
const authorization = require("../middleware/authorization");

router.get("/", moviesController.getAllTheMovies);

module.exports = router;
