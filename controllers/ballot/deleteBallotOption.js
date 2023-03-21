const ballotModel = require("../../models/ballotModel");
const cloudinary = require("../../utils/cloudinary");

const deleteBallotOptions = async (req, res) => {
  const { electionId } = req.cookies;
  const { _id, options, _imgId } = req.body;

  await cloudinary.uploader.destroy(_imgId);

  const updatedBallotOptions = await ballotModel.findOneAndUpdate(
    { _id, createdBy: electionId },
    { options },
    { new: true, runValidators: true }
  );
  return res.status(200).json(updatedBallotOptions);
};

module.exports = deleteBallotOptions;
