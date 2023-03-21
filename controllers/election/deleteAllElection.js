const ballotModel = require("../../models/ballotModel");
const electionModel = require("../../models/electionModel");
const votedModel = require("../../models/votedModel");
const deleteAllElection = async (req, res) => {
  const { userId } = req.cookies;

  const electionData = await electionModel.find({
    createdBy: userId,
  });

  electionData.forEach(async (election) => {
    const ballots = await ballotModel.find({ createdBy: election._id });
    if (ballots) {
      ballots.forEach(async (ballot) => {
        ballot.options.forEach(async (option) => {
          await uploadModel.findOneAndDelete({ createdBy: option._id });
        });
        await BallotModel.findByIdAndDelete(ballot._id);
      });
    }
  });

  electionData.forEach(async (election) => {
    const voteds = await votedModel.find({ createdBy: election._id });
    if (voteds) {
      voteds.forEach(async (voted) => {
        await votedModel.findByIdAndDelete(voted._id);
      });
    }
  });

  const isDeleted = await electionModel.deleteMany({
    createdBy: userId,
    status: "building",
  });

  if (isDeleted) {
    res.status(200).json("deleted");
  } else {
    res.status(200).json(false);
  }
};
module.exports = deleteAllElection;
