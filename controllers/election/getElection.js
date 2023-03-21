const electionModel = require("../../models/electionModel");
const getElection = async (req, res) => {
  const { userId } = req.cookies;
  const election = await electionModel.find({ createdBy: userId });
  return res.status(200).json(election);
};
module.exports = getElection;
