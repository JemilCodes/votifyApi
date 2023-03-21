const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const electionAuth = require("../middlewares/electionAuth");

router.use(authMiddleware);

const {
  createBallot,
  updateBallot,
  deleteBallot,
  getBallot,
  getSingleBallot,
  updateBallotOptions,
  addBallotOptions,
  deleteBallotOptions,
} = require("../controllers");

router.route("/ballot/single").post(getSingleBallot);
router.route("/ballot").get(getBallot);
router.route("/ballot/create").post(electionAuth, createBallot);
router.route("/ballot/update").patch(electionAuth, updateBallot);
router.route("/ballot/options/update").patch(electionAuth, updateBallotOptions);
router.route("/ballot/options/add").post(electionAuth, addBallotOptions);
router.route("/ballot/options/delete").patch(electionAuth, deleteBallotOptions);
router.route("/ballot/delete").delete(electionAuth, deleteBallot);

module.exports = router;
