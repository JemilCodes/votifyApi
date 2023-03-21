const ballotModel = require("../../models/ballotModel");
// const uploadModel = require("../../models/uploadModel");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs").promises;

const cloudinary = require("../../utils/cloudinary");

const addBallotOptions = async (req, res) => {
  const { imgUrl, options, _id, optionId } = req.body;

  let newImgBuffer;
  let uploadedImage;
  let newOptions = options;

  if (typeof imgUrl.path === "string") {
    newImgBuffer = await fs.readFile(imgUrl.path);

    fs.unlink(imgUrl.path, (err) => {
      if (err) {
        throw new Error(err);
      }
      return;
    });
    const base64 = `data:${
      imgUrl.type
    };charset=utf-8;base64,${newImgBuffer?.toString("base64")}`;

    uploadedImage = await cloudinary.uploader.upload(base64, {
      folder: "votify",
    });
    newOptions = options.map((option) => {
      if (option._id === optionId) {
        return {
          ...option,
          imgUrl: uploadedImage.secure_url,
          _imgId: uploadedImage.public_id,
        };
      } else return option;
    });
  }

  if (typeof imgUrl.path === "string" && !uploadedImage) {
    return res.status(StatusCodes.OK).json("serverError");
  }

  const data = await ballotModel.findOneAndUpdate(
    { _id },
    {
      options: newOptions,
    },
    { new: true, runValidators: true }
  );
  return res.status(200).json(data);
};

module.exports = addBallotOptions;
