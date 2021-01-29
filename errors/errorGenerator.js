const DEFAULT_HTTP_STATUS_MESSAGES = {
  400: "Bad Requests",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
  503: "Temporary Unavailable",
};

const errorGenerator = ({
  message = "",
  statusCode = 500,
  validationErrors,
}) => {
  const err = new Error(message || DEFAULT_HTTP_STATUS_MESSAGES[statusCode]);
  err.statusCode = statusCode;
  console.log(validationErrors);
  throw err;
};

module.exports = errorGenerator;
