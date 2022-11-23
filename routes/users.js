
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authorization = require("../middleware/authorization")



router.get('/favorites', authorization.checkAuthenticated, userController.getFavorites)

router.post('/favorites/:movie', authorization.checkAuthenticated, userController.addToFavorites)

router.post('/removefavorites/:movie', authorization.checkAuthenticated, userController.removeFromFavorites)
router.post('/image', authorization.checkAuthenticated, userController.uploadImg)
router.put('/:name', authorization.checkAuthenticated, userController.modifyName)



module.exports = router;
