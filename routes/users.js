const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post('/api/users/signup', userController.signup);
router.post('/api/users/signin', userController.signin);
router.get('/api/auth/user', userController.getUser)           

module.exports = router;
