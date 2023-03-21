const votedModel = require("../../models/votedModel");
const { StatusCodes } = require("http-status-codes");

const getSinglevoted2 = async (req, res) => {
  console.log("gi");
  const { electionId } = req.cookies;
  const { voterId, voterName } = req.body;
  const voted = await votedModel.findOne({
    voterId,
    voterName,
    createdBy: electionId,
  });
  if (voted) {
    return res.status(StatusCodes.ACCEPTED).json(voted);
  } else {
    return res.status(StatusCodes.NOT_FOUND).json("notFound");
  }
};
module.exports = getSinglevoted2;
