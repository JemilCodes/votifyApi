const mongoose = require("mongoose");
const votedSchema = new mongoose.Schema({
  voterName: String,
  createdBy: String,
  electionTitle: String,
  timeVoted: Date,
  voteData: Object,
});

module.exports = mongoose.model("voted", votedSchema);
