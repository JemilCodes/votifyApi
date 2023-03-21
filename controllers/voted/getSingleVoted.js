const votedModel = require("../../models/votedModel");
const { StatusCodes } = require("http-status-codes");

const getSinglevoted = async (req, res) => {
  const { electionId, voterId, voterName } = req.cookies;

  const voted = await votedModel.findOne({
    voterId,
    voterName,
    createdBy: electionId,
  });
  if (voted) {
    return res.status(StatusCodes.OK).json("alreadyVoted");
  } else {
    return res.status(StatusCodes.ACCEPTED).json("vote");
  }
};
module.exports = getSinglevoted;
