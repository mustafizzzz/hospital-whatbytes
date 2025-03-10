const express = require('express');
const { registerController, loginController } = require('../controller/authController');
const { validateSignup, validateLogin } = require('../middleware/authValidator');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();



router.route("/register").post(authLimiter, validateSignup, registerController)
router.route("/login").post(authLimiter, validateLogin, loginController);


module.exports = router;
