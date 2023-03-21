const express = require("express");
const authMiddleware = require("../middlewares/auth");
const electionAuth = require("../middlewares/electionAuth");

const router = express.Router();

router.use(authMiddleware);
const {
  createElection,
  updateElection,
  deleteElection,
  getElection,
  getSingleElection,
  updateVoters,
  loginVote,
  getSingleElection2,
  deleteAllElection,
  electUpdate,
} = require("../controllers");

router.route("/election").get(getElection);
router.route("/election/single/get").get(getSingleElection2);
router.route("/election/voter/update").patch(electionAuth, updateVoters);
router.route("/elect/update").patch(electUpdate);
router.route("/election/single").post(getSingleElection);
router.route("/election/create").post(createElection);
router.route("/election/update").patch(electionAuth, updateElection);
router.route("/election/delete").delete(deleteElection);
router.route("/vote/login").post(loginVote);
router.route("/election/deleteAll").delete(deleteAllElection);

module.exports = router;
