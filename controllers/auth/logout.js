const UserModel = require("../../models/userModel");
const clearCookie = require("../../utils/clearCookies");

const logout = async (req, res) => {
  const cookies = req.cookies;
  const { email } = req.cookies;

  const logged = await UserModel.findOneAndUpdate(
    { email },
    { isLoggedIn: false },
    { new: true, runValidators: true }
  );
  if (logged.isLoggedIn !== false) {
    return res.status(500).json("server-error");
  }
  if (cookies?.jwt) {
    // res.clearCookie("jwt", { httpOnly: true, secure: false });
    clearCookie(res, "jwt");
  }
  if (cookies?.email) {
    // res.clearCookie("email", { httpOnly: true, secure: false });
    clearCookie(res, "email");
  }
  if (cookies?.electionId) {
    // res.clearCookie("electionId", { httpOnly: true, secure: false });
    clearCookie(res, "electionId");
  }
  if (cookies?.optionId) {
    // res.clearCookie("optionId", { httpOnly: true, secure: false });
    clearCookie(res, "optionId");
  }
  if (cookies?.electionTitle) {
    // res.clearCookie("electionTitle", { httpOnly: true, secure: false });
    clearCookie(res, "electionTitle");
  }
  if (cookies?.userId) {
    // res.clearCookie("userId", { httpOnly: true, secure: false });
    clearCookie(res, "userId");
  }
  res.json("logged out");
};

module.exports = logout;
