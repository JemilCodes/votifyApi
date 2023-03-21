const CustomApiError = require("./custom_api_error");
const { StatusCodes } = require("http-status-codes");
class AuthError extends CustomApiError {
  constructor(messages) {
    super(messages);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = AuthError;
