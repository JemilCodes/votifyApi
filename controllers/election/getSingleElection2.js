const electionModel = require("../../models/electionModel");
const getSingleElection2 = async (req, res) => {
  const { electionId } = req.cookies;
  const election = await electionModel.findOne({ _id: electionId });
  res.cookie("electionStatus", election.status, {
    httpOnly: true, //accessible only by web server
    // secure: true, //https
    // sameSite: "None", //cross-site cookie
    // maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });
  return res.status(200).json(election);
};
module.exports = getSingleElection2;
