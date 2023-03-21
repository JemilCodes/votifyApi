const emailTemplateModel = require("../../models/emailTemplateModel");
const getEmailTemplate = async (req, res) => {
  const { electionId: createdBy } = req.cookies;
  const data = await emailTemplateModel.findOne({ createdBy });
  return res.status(200).json(data);
};

module.exports = getEmailTemplate;
