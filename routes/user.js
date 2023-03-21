const express = require("express");
const router = express.Router();
const { getUser, deleteUser, updateUser } = require("../controllers");
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);

router.route("/user/get").get(getUser);
router.route("/user/delete").delete(deleteUser);
router.route("/user/update").patch(updateUser);

module.exports = router;
