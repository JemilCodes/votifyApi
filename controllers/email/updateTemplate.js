const emailTemplateModel = require("../../models/emailTemplateModel");
const postEmailTemplate = async (req, res) => {
  const { electionId: createdBy } = req.cookies;
  const { action } = req.body;
  if (action === "invite") {
    const { inviteFromName, inviteSubject, inviteBody } = req.body;
    const data = await emailTemplateModel.findOneAndUpdate(
      { createdBy },
      { inviteFromName, inviteSubject, inviteBody },
      { new: true, runValidators: true }
    );
    return res.status(200).json(data);
  }
  if (action === "remind") {
    const { remindFromName, remindSubject, remindBody } = req.body;
    const data = await emailTemplateModel.findOneAndUpdate(
      { createdBy },
      { remindFromName, remindSubject, remindBody },
      { new: true, runValidators: true }
    );
    return res.status(200).json(data);
  }
};

module.exports = postEmailTemplate;
