const ballotModel = require("../../models/ballotModel");
const getBallot = async (req, res) => {
  const { electionId } = req.cookies;
  const ballot = await ballotModel.find({ createdBy: electionId });
  return res.status(200).json(ballot);
};
module.exports = getBallot;
