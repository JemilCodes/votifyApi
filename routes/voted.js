const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);

const {
  getSingleVoted,
  getVoted,
  createVoted,
  getSingleVoted2,
} = require("../controllers");

router.route("/voted/get").get(getVoted);
router.route("/voted/get/single").post(getSingleVoted);
router.route("/voted/get/single2").post(getSingleVoted2);
router.route("/voted/create").post(createVoted);

module.exports = router;
