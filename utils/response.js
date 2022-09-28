exports.badRequest = (res, message, errors) => {
  const responseJson = {
    result: 'error',
    message: message,
  };
  if (errors) responseJson.errors = errors;
  res.status(400).json(responseJson);
};

exports.unauthorized = (res, message) => {
  res.status(401).json({
    result: 'error',
    message: message || 'User not authorized',
  });
};

exports.serverError = (res, err, message) => {
  res.status(500).json({
    result: 'error',
    message: message || 'Internal server error',
  });
};

exports.notFound = (res, message) => {
  res.status(404).json({
    result: 'error',
    message: message || 'Not found',
  });
};

exports.success = (res, data) => {
  res.status(200).json({
    result: 'ok',
    data: data,
  });
};
