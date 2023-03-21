const uploadModel = require("../../models/uploadModel");

const deleteUpload = async (req, res) => {
  await uploadModel.findOneAndDelete({
    createdBy: req.headers.optionid,
  });
  res.end();
};

module.exports = deleteUpload;
