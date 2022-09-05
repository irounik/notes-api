const { body, validationResult } = require('express-validator');
const { badRequest } = require('../utils/response');

exports.validateSignUp = [
  body('name', 'Invalid username')
    .exists()
    .matches(/^[a-zA-Z ]+$/),
  body('email', 'Invalid email').exists().isEmail(),
  body('password', 'Invalid password, it should be atlease 6 digit long').exists().isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) next();
    else badRequest(res, `Invalid inputs for creating user`, errors);
  },
];

exports.validateLogin = [
  body('email', 'Invalid email').exists().isEmail(),
  body('password', 'Invalid password, it should be atlease 6 digit long').exists().isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) next();
    else badRequest(res, `Invalid inputs for creating user`, errors);
  },
];
