const mongoose = require("mongoose");
const ballotSchema = new mongoose.Schema({
  title: String,
  createdBy: String,
  createdAt: Date,
  description: String,
  options: Array,
});

module.exports = mongoose.model("Ballot", ballotSchema);
