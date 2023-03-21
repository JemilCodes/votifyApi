const register = require("./auth/register");
const login = require("./auth/login");
const refresh = require("./auth/refresh");
const logout = require("./auth/logout");
const createBallot = require("./ballot/createBallot");
const createElection = require("./election/createElection");
const deleteBallot = require("./ballot/deleteBallot");
const deleteElection = require("./election/deleteElection");
const updateBallot = require("./ballot/updateBallot");
const updateElection = require("./election/updateElection");
const updateVoters = require("./election/updateVoters");
const getBallot = require("./ballot/getBallot");
const getElection = require("./election/getElection");
const getSingleElection = require("./election/getSingleElection");
const getSingleBallot = require("./ballot/getSingleBallot");
const updateBallotOptions = require("./ballot/updateBallotOptions");
const loginVote = require("./loginVote/loginVote");
const createVoted = require("./voted/createVoted");
const getVoted = require("./voted/getVoted");
const getSingleVoted = require("./voted/getSingleVoted");
const upload = require("./upload/upload");
const deleteUpload = require("./upload/deleteUpload");
const getUser = require("./user/getUser");
const getUpload = require("./upload/getUpload");
const getUpload2 = require("./upload/getUpload2");
const getSingleElection2 = require("./election/getSingleElection2");
const isLoggedIn = require("./auth/isLoggedIn");
const deleteUser = require("./user/deleteUser");
const updateUser = require("./user/updateUser");
const deleteAllElection = require("./election/deleteAllElection");
const getSingleVoted2 = require("./voted/getSingleVoted2");
const mailer = require("./email/email");
const getTemplate = require("./email/getTemplate");
const postTemplate = require("./email/postTemplate");
const updateTemplate = require("./email/updateTemplate");
const electUpdate = require("./election/electUpdate");
const optionUpload = require("./upload/optionUpload");
const deleteOptionUpload = require("./upload/deleteOptionUpload");
const deleteBallotOptions = require("./ballot/deleteBallotOption");
const addBallotOptions = require("./ballot/addBallotOption");
module.exports = {
  electUpdate,
  addBallotOptions,
  deleteBallotOptions,
  register,
  login,
  logout,
  createBallot,
  createElection,
  deleteBallot,
  deleteElection,
  updateBallot,
  updateElection,
  getBallot,
  getElection,
  getSingleElection,
  getSingleBallot,
  updateBallotOptions,
  updateVoters,
  loginVote,
  createVoted,
  getSingleVoted,
  getVoted,
  refresh,
  upload,
  deleteUpload,
  getUser,
  getUpload,
  getUpload2,
  getSingleElection2,
  isLoggedIn,
  deleteUser,
  updateUser,
  deleteAllElection,
  getSingleVoted2,
  mailer,
  getTemplate,
  postTemplate,
  updateTemplate,
  optionUpload,
  deleteOptionUpload,
};
