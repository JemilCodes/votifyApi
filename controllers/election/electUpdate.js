const ElectionModel = require("../../models/electionModel");

const electUpdate = async (req, res) => {
  const { electionId: _id, userId: createdBy } = req.cookies;
  const response = await ElectionModel.findOneAndUpdate(
    {
      _id,
      createdBy,
    },
    req.body,
    { new: true, runValidators: true }
  );
  return res.status(200).json(response);
};

module.exports = electUpdate;
