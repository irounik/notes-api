const { body, validationResult } = require('express-validator');
const { badRequest } = require('../utils/response');

const validateEmail = body('email', 'Invalid email').exists().isEmail();

const validatePassword = body('password', 'Invalid password, it should be at least 6 digit long')
  .exists()
  .isLength({ min: 6 });

const validateUserName = body('name', 'Invalid username')
  .exists()
  .matches(/^[a-zA-Z ]+$/);

const checkErrors = (message) => (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else badRequest(res, message, errors.errors);
};

exports.validateSignUp = [
  validateUserName,
  validateEmail,
  validatePassword,
  checkErrors('Invalid inputs for creating user'),
];

exports.validateLogin = [validateEmail, validatePassword, checkErrors('Invalid inputs for logging in')];
