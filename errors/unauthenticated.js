const { StatusCodes } = require("http-status-codes");
const customError = require("./custom-error");

class UnauthenticatedError extends customError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
