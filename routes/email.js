const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);

const {
  mailer,
  getTemplate,
  postTemplate,
  updateTemplate,
} = require("../controllers");

router.route("/email/send").post(mailer);
router.route("/email/template/get").get(getTemplate);
router.route("/email/template/post").post(postTemplate);
router.route("/email/template/update").patch(updateTemplate);

module.exports = router;
