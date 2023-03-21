const uploadModel = require("../../models/uploadModel");

const getUpload = async (req, res) => {
  const response = await uploadModel.findOne({
    ...req.body,
  });
  if (response) {
    const data = `data:${
      response?.imgType
    };charset=utf-8;base64,${response?.img?.toString("base64")}`;
    return res.status(200).json(data);
  } else {
    return res.status(404).json("not-found");
  }
};

module.exports = getUpload;
