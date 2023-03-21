const electionModel = require("../../models/electionModel");
const updateElection = async (req, res) => {
  const { electionId, userId } = req.cookies;
  const { title, description, endDate } = req.body;
  console.log(userId, electionId, title, description, endDate);
  const isExist = await electionModel.findOne({ title, createdBy: userId });
  if (isExist) {
    return res.status(200).json("alreadyExist");
  }
  const updatedElection = await electionModel.findOneAndUpdate(
    { _id: electionId, createdBy: userId },
    { title, description, endDate },
    { new: true, runValidators: true }
  );
  if (updatedElection) {
    return res.status(200).json("updated");
  } else {
    return res.status(500).json("failed");
  }
};
module.exports = updateElection;
