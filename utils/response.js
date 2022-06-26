exports.badRequest = (res, message) => {
  res.status(400).json({
    result: 'error',
    message: message,
  });
};

exports.serverError = (res, err, message) => {
  console.log(err);
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
