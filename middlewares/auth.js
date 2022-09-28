const jwt = require('jsonwebtoken');
const responses = require('../utils/response');
const contants = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.header(contants.Authorization).split(' ')[1];
  if (!token) return responses.unauthorized(res, 'User is not authorized');
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (ex) {
    console.error(ex);
    responses.badRequest(res, 'Invalid Token', ex);
  }
};
