const { StatusCodes } = require("http-status-codes");
const customError = require("./custom-error");

class NotFoundError extends customError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
