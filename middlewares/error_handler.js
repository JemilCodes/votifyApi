const { CustomApiError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  } else {
    console.log(err.message);
    return res.status(StatusCodes.OK).json("serverError");
  }
};

module.exports = errorHandler;
