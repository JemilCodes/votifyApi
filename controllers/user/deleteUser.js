const UserModel = require("../../models/userModel");
const ElectionModel = require("../../models/electionModel");
const BallotModel = require("../../models/ballotModel");
const ballotModel = require("../../models/ballotModel");
const votedModel = require("../../models/votedModel");
const uploadModel = require("../../models/uploadModel");
const clearCookie = require("../../utils/clearCookies");

const deleteUser = async (req, res) => {
  const { userId } = req.cookies;
  const cookies = req.cookies;

  const allUserElection = await ElectionModel.find({ createdBy: userId });

  allUserElection.forEach(async (election) => {
    const ballots = await ballotModel.find({ createdBy: election._id });
    if (ballots) {
      ballots.forEach(async (ballot) => {
        ballot.options.forEach(async (option) => {
          await uploadModel.findOneAndDelete({ createdBy: option._id });
        });
        await BallotModel.findByIdAndDelete(ballot._id);
      });
    }
  });

  allUserElection.forEach(async (election) => {
    const voteds = await votedModel.find({ createdBy: election._id });
    if (voteds) {
      voteds.forEach(async (voted) => {
        await votedModel.findByIdAndDelete(voted._id);
      });
    }
  });

  await ElectionModel.deleteMany({ createdBy: userId });

  const profileImg = await uploadModel.findOne({ createdBy: userId });
  if (profileImg) {
    await uploadModel.findOneAndDelete({ createdBy: userId });
  }
  const userDeleted = await UserModel.findByIdAndDelete(userId);
  if (!userDeleted) {
    return res.status(500).json("internal server error");
  }

  if (cookies?.jwt) {
    // res.clearCookie("jwt", { httpOnly: true, secure: false });
    clearCookie(res, "jwt");
  }
  if (cookies?.email) {
    // res.clearCookie("email", { httpOnly: true, secure: false });
    clearCookie(res, "email");
  }
  if (cookies?.electionId) {
    // res.clearCookie("electionId", { httpOnly: true, secure: false });
    clearCookie(res, "electionId");
  }
  if (cookies?.optionId) {
    // res.clearCookie("optionId", { httpOnly: true, secure: false });
    clearCookie(res, "optionId");
  }
  if (cookies?.electionTitle) {
    // res.clearCookie("electionTitle", { httpOnly: true, secure: false });
    clearCookie(res, "electionTitle");
  }
  if (cookies?.userId) {
    // res.clearCookie("userId", { httpOnly: true, secure: false });
    clearCookie(res, "userId");
  }
  return res.status(200).json("user deleted");
};

module.exports = deleteUser;
