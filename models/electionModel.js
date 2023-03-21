const mongoose = require("mongoose");
const electionSchema = new mongoose.Schema({
  title: String,
  createdBy: String,
  createdAt: Date,
  description: String,
  voters: Array,
  endDate: Number,
  status: String,
});

module.exports = mongoose.model("Election", electionSchema);
