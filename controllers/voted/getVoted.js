const votedModel = require("../../models/votedModel");
const { StatusCodes } = require("http-status-codes");

const getvoted = async (req, res) => {
  const { electionId: createdBy } = req.cookies;
  const electionResult = await votedModel.find({ createdBy });
  if (electionResult) {
    return res.status(StatusCodes.ACCEPTED).json(electionResult);
  } else if (!electionResult) {
    return res.status(StatusCodes.NOT_FOUND).json("noResult");
  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("error");
  }
};
module.exports = getvoted;
