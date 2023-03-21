const ballotModel = require("../../models/ballotModel");
const electionModel = require("../../models/electionModel");
const uploadModel = require("../../models/uploadModel");

const deleteElection = async (req, res) => {
  const { electionId: _id, userId: createdBy } = req.cookies;

  const isDeleted = await electionModel.findOneAndDelete({ _id, createdBy });

  if (isDeleted) {
    const ballots = await ballotModel.find({ createdBy: isDeleted._id });
    ballots.forEach(async (ballot) => {
      ballot.options.forEach(async (option) => {
        await uploadModel.findOneAndDelete({ createdBy: option._id });
      });
      await ballotModel.findByIdAndDelete(ballot._id);
    });

    res.status(200).json("deleted");
  } else {
    res.status(500).json("failed");
  }
};
module.exports = deleteElection;
