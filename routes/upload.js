const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);

const {
  upload,
  deleteUpload,
  getUpload,
  getUpload2,
  optionUpload,
  deleteOptionUpload,
} = require("../controllers");

router.route("/upload").post(upload);
router.route("/optionUpload").post(optionUpload);
router.route("/upload/get").post(getUpload);
router.route("/upload/get").get(getUpload2);
router.route("/upload").delete(deleteUpload);
router.route("/optionUpload/delete").delete(deleteOptionUpload);

module.exports = router;
