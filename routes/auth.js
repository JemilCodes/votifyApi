const express = require("express");
const router = express.Router();

const {
  register,
  login,
  refresh,
  logout,
  isLoggedIn,
} = require("../controllers");
router.route("/auth/register").post(register);
router.route("/auth/login").post(login);
router.route("/auth/refresh").get(refresh);
router.route("/auth/logout").post(logout);
router.route("/auth/isLoggedIn").get(isLoggedIn);

module.exports = router;
