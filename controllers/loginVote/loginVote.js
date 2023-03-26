const { StatusCodes } = require("http-status-codes");
const handleCookies = require("../../utils/handleCookies");

const electionModel = require("../../models/electionModel");
const loginVote = async (req, res) => {
  const { electionId, electionTitle } = req.cookies;
  const { voterKey, voterName } = req.body;
  const election = await electionModel.findOne({
    _id: electionId,
    title: electionTitle,
  });

  if (
    election.status === "building" &&
    voterKey === "test" &&
    voterName === "test"
  ) {
    return res.status(StatusCodes.ACCEPTED).json("preview-vote");
  }
  const voter = election.voters.find((voter) => {
    return voter.voterKey === voterKey && voter.name === voterName;
  });
  if (voter) {
    // res.cookie("voterId", voter._id, {
    //   httpOnly: true, //accessible only by web server
    //   // secure: true, //https
    //   // sameSite: "None", //cross-site cookie
    //   maxAge: 1 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    // });
    handleCookies(res, "voterId", voter._id);

    // res.cookie("voterName", voter.name, {
    //   httpOnly: true, //accessible only by web server
    //   // secure: true, //https
    //   // sameSite: "None", //cross-site cookie
    //   maxAge: 1 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    // });
    handleCookies(res, "voterName", voter.name);

    return res.status(200).json(voter);
  } else {
    return res.status(StatusCodes.OK).json("voterDoesNotExist");
  }
};
module.exports = loginVote;
