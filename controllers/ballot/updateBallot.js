const ballotModel = require("../../models/ballotModel");
const updateBallot = async (req, res) => {
  const { electionId } = req.cookies;
  const { _id, title, description } = req.body;
  if (title.length < 3 || description.length < 3) {
    return res.status(200).json("checkCredentials");
  }
  const alreadyExist = await ballotModel.findOne({
    title,
    createdBy: electionId,
  });
  if (alreadyExist) {
    return res.status(200).json("cantCreateTwoBallotsWithDesameTitle");
  }
  const updatedBallot = await ballotModel.findOneAndUpdate(
    { _id, createdBy: electionId },
    { title, description },
    { new: true, runValidators: true }
  );
  return res.status(200).json(updatedBallot);
};
module.exports = updateBallot;
