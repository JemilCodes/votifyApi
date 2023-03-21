const emailTemplateModel = require("../../models/emailTemplateModel");
const postEmailTemplate = async (req, res) => {
  const { electionId: createdBy } = req.cookies;
  const {
    inviteFromName,
    inviteSubject,
    inviteBody,
    remindFromName,
    remindSubject,
    remindBody,
  } = req.body;
  const data = await emailTemplateModel.create({
    inviteFromName,
    inviteSubject,
    inviteBody,
    createdBy,
    remindFromName,
    remindSubject,
    remindBody,
  });
  return res.status(200).json(data);
};

module.exports = postEmailTemplate;
