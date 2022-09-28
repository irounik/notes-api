const express = require('express');

const check = require('../middlewares/validations');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/sign-up', check.validateSignUp, authController.createUser);
router.post('/login', check.validateLogin, authController.login);

module.exports = router;
