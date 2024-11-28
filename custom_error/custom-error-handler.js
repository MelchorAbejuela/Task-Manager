// built in error format
// const error = new Error("Not Found");
// error.status = 404;

// create an instance of built in error class
class NotFoundError extends Error {
  constructor(message, statusCode) {
    super(message); // calls the built in error constructor
    this.statusCode = statusCode;
  }
}

module.exports = NotFoundError;
