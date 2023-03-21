const electionModel = require("../../models/electionModel");
const updateVoters = async (req, res) => {
  const { voters } = req.body;
  const { userId, electionId } = req.cookies;
  const updatedVoters = await electionModel.findOneAndUpdate(
    { _id: electionId, createdBy: userId },
    { voters },
    { new: true, runValidators: true }
  );
  res.status(200).json(updatedVoters);
};
module.exports = updateVoters;
