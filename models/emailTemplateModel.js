const mongoose = require("mongoose");
const emailTemplate = new mongoose.Schema({
  inviteFromName: String,
  inviteSubject: String,
  inviteBody: String,
  remindFromName: String,
  remindSubject: String,
  remindBody: String,
  createdBy: String,
});

module.exports = mongoose.model("emailTemplate", emailTemplate);
