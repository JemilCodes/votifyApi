const ballotModel = require("../../models/ballotModel");
const cloudinary = require("../../utils/cloudinary");

const deleteBallot = async (req, res) => {
  const { electionId } = req.cookies;
  const { _id } = req.body;
  const isDeleted = await ballotModel.findOneAndDelete({
    _id,
    createdBy: electionId,
  });
  if (isDeleted) {
    isDeleted.options.forEach(async (option) => {
      if (typeof option?._id === "string") {
        await cloudinary.uploader.destroy(option?._imgId).catch((err) => {
          console.log(err);
        });
      }
    });
    return res.status(200).json("ballotDeleted");
  } else {
    return res.status(200).json(false);
  }
};
module.exports = deleteBallot;
