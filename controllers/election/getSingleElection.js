const electionModel = require("../../models/electionModel");
const getSingleElection = async (req, res) => {
  // const { email } = req.user;
  const { userId, electionId } = req.cookies;
  const { _id, createdBy } = req.body;
  const cleanReq = req.body?.cleanReq;
  const fromVote = req.body?.fromVote;

  if (fromVote === true) {
    const { _id, title } = req.body;
    const election = await electionModel.findOne({
      _id,
      title,
    });
    if (election) {
      res.cookie("electionStatus", election.status, {
        httpOnly: true, //accessible only by web server
        // secure: true, //https
        // sameSite: "None", //cross-site cookie
        // maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
      });
      res.cookie("electionId", election._id, {
        httpOnly: true, //accessible only by web server
        // secure: true, //https
        // sameSite: "None", //cross-site cookie
        // maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
      });
      res.cookie("electionTitle", election.title, {
        httpOnly: true, //accessible only by web server
        // secure: true, //https
        // sameSite: "None", //cross-site cookie
        // maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
      });
      const { endDate, status, title } = election;
      return res.status(200).json({ endDate, status, title });
    }
    if (!election) {
      return res.status(200).json("thisElectionDoesNotExist");
    } else {
      throw new Error();
    }
  }

  if (cleanReq === true) {
    const election = await electionModel.findOne({
      _id: electionId,
      createdBy: userId,
    });
    if (election) {
      res.cookie("electionStatus", election.status, {
        httpOnly: true, //accessible only by web server
        // secure: true, //https
        // sameSite: "None", //cross-site cookie
        // maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
      });
      res.cookie("electionId", election._id, {
        httpOnly: true, //accessible only by web server
        // secure: true, //https
        // sameSite: "None", //cross-site cookie
        // maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
      });
      res.cookie("electionTitle", election.title, {
        httpOnly: true, //accessible only by web server
        // secure: true, //https
        // sameSite: "None", //cross-site cookie
        // maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
      });
      return res.status(200).json(election);
    }
    if (!election) {
      return res.status(200).json("login-again");
    } else {
      throw new Error();
    }
  }

  const election = await electionModel.findOne({ _id, createdBy });
  if (election) {
    res.cookie("electionId", election._id, {
      httpOnly: true, //accessible only by web server
      // secure: true, //https
      // sameSite: "None", //cross-site cookie
      // maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
    return res.status(200).json(election);
  }
  if (!election) {
    return res.status(404).json("couldNotFindElection");
  } else {
    throw new Error();
  }
};
module.exports = getSingleElection;
