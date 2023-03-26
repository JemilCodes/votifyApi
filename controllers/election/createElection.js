const electionModel = require("../../models/electionModel");
const { StatusCodes } = require("http-status-codes");
const handleCookies = require("../../utils/handleCookies");

const createElection = async (req, res) => {
  const { title, voters, description, endDate, status } = req.body;
  const { userId } = req.cookies;
  if (title.length < 3) {
    return res
      .status(StatusCodes.OK)
      .json("character must be greater than two");
  }
  if (title && endDate) {
    const electionExist = await electionModel.findOne({
      title,
      createdBy: userId,
    });
    if (electionExist) {
      return res
        .status(StatusCodes.OK)
        .json("cantCreateTwoElectionsWithDesameTitle");
    }
    if (!electionExist) {
      const election = await electionModel.create({
        title,
        createdBy: userId,
        createdAt: Date.now(),
        description: description,
        voters: voters,
        endDate,
        status,
      });

      // res.cookie("electionId", election._id, {
      //   httpOnly: true, //accessible only by web server
      //   // secure: true,          //https
      //   // sameSite: "None",     //cross-site cookie
      //   // maxAge: 7 * 24 * 60 * 60 * 1000,       //cookie expiry: set to match rT
      // });
      handleCookies(res, "electionId", election._id);

      return res.status(StatusCodes.ACCEPTED).json(election);
    }
  } else {
    res.status(StatusCodes.OK).json("credentialError");
  }
};
module.exports = createElection;
