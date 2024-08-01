const express = require('express')
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation')
const authController = require('../Controllers/AuthController')
const router = express.Router()

router.post('/login', loginValidation, authController.login)
router.post('/signup', signupValidation, authController.signup)
module.exports = router