const mongoose = require("mongoose");
const uploadSchema = new mongoose.Schema({
  createdBy: String,
  img: Buffer,
  imgType: String,
});

module.exports = mongoose.model("Upload", uploadSchema);
