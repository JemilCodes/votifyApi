const ballotModel = require("../../models/ballotModel");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs").promises;
const cloudinary = require("../../utils/cloudinary");

const updateBallotOptions = async (req, res) => {
  const { imgUrl, options, _id: ballotId, _imgId, optionId } = req.body;

  let imageUploaded;
  let newOptions = options;
  if (typeof imgUrl.path === "string") {
    newImgBuffer = await fs.readFile(imgUrl.path);
    fs.unlink(imgUrl.path, (err) => {
      if (err) {
        throw new Error(err);
      }
      return;
    });

    if (_imgId && _imgId !== "") {
      await cloudinary.uploader.destroy(_imgId);
    }

    const base64 = `data:${
      imgUrl.type
    };charset=utf-8;base64,${newImgBuffer?.toString("base64")}`;

    imageUploaded = await cloudinary.uploader.upload(base64, {
      folder: "votify",
      width: 150,
      height: 150,
      crop: "scale",
    });
    newOptions = options.map((option) => {
      if (option._id === optionId) {
        return {
          ...option,
          imgUrl: imageUploaded.secure_url,
          _imgId: imageUploaded.public_id,
        };
      } else return option;
    });
  }

  if (typeof imgUrl.path === "string" && !imageUploaded) {
    return res.status(StatusCodes.OK).json("serverError");
  }
  const data = await ballotModel.findOneAndUpdate(
    { _id: ballotId },
    {
      options: newOptions,
    },
    { new: true, runValidators: true }
  );

  return res.status(200).json(data);
};

module.exports = updateBallotOptions;
