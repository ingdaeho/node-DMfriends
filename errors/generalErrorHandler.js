const generalErrorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;
  console.error(err);
  res.status(statusCode || 500).json({ message });
};

module.exports = generalErrorHandler;
