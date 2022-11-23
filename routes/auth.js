const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const authorization = require("../middleware/authorization")

router.get('/',  authController.getUser);
router.post('/register',  authController.registerNewUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);




module.exports = router;