const ballotModel = require("../../models/ballotModel");
const getSingleBallot = async (req, res) => {
  const { electionId } = req.cookies;
  const { _id } = req.body;
  const ballot = await ballotModel.findOne({ createdBy: electionId, _id });
  return res.status(200).json(ballot);
};
module.exports = getSingleBallot;
