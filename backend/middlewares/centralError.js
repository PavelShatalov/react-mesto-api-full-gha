const centralError = (err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500);
  } else {
    res.status(err.statusCode);
  }
  next();
};

module.exports = centralError;
