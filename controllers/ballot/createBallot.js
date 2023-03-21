const ballotModel = require("../../models/ballotModel");
const { StatusCodes } = require("http-status-codes");
const createBallot = async (req, res) => {
  const { electionId } = req.cookies;
  const { title, description, options } = req.body;
  if (title.length > 2 && electionId && description.length > 2) {
    const ballotExist = await ballotModel.findOne({
      title,
      createdBy: electionId,
    });
    if (ballotExist) {
      return res
        .status(StatusCodes.OK)
        .json("cantCreateTwoBallotsWithDesameTitle");
    }
    if (!ballotExist) {
      const ballot = await ballotModel.create({
        title,
        createdBy: electionId,
        createdAt: Date.now(),
        description: description,
        options: options,
      });
      console.log(ballot);
      return res.status(StatusCodes.OK).json(ballot);
    }
  } else {
    return res.status(200).json("checkCredentials");
  }
};
module.exports = createBallot;
