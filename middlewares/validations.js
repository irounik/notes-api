const { body, validationResult } = require('express-validator');
const { INVALID_PASSOWRD, INVALID_USERNAME, INVALID_EMAIL } = require('../utils/constants');
const { badRequest } = require('../utils/response');

const validateEmail = body('email', INVALID_EMAIL).isEmail();

const validatePassword = body('password', INVALID_PASSOWRD).isLength({ min: 6 });

const validateUserName = body('name', INVALID_USERNAME).matches(/^([a-zA-Z ]+){3,}$/);

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
