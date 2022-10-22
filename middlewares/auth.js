const jwt = require('jsonwebtoken');
const responses = require('../utils/response');
const constants = require('../utils/constants');

module.exports = (req, res, next) => {
  const authorizationHeader = req.header(constants.Authorization);
  if (!authorizationHeader || !authorizationHeader.startsWith(constants.Bearer)) {
    return responses.unauthorized(res);
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (ex) {
    console.error(ex);
    responses.unauthorized(res, 'Invalid Token', ex);
  }
};
