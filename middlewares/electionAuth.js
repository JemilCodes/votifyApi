const { StatusCodes } = require("http-status-codes");

const electionAuth = (req, res, next) => {
  const { electionStatus } = req.cookies;
  if (electionStatus === "building") {
    next();
  } else {
    return res.status(StatusCodes.OK).json("cantEdit");
  }
};

module.exports = electionAuth;
