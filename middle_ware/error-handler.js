const NotFoundError = require("../custom_error/custom-error-handler");

const errorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res.status(500).json({ msg: `Something went wrong.` });
};

module.exports = errorHandler;
