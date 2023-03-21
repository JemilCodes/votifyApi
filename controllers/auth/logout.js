const UserModel = require("../../models/userModel");
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
    res.clearCookie("jwt", { httpOnly: true, secure: false });
  }
  if (cookies?.email) {
    res.clearCookie("email", { httpOnly: true, secure: false });
  }
  if (cookies?.electionId) {
    res.clearCookie("electionId", { httpOnly: true, secure: false });
  }
  if (cookies?.optionId) {
    res.clearCookie("optionId", { httpOnly: true, secure: false });
  }
  if (cookies?.electionTitle) {
    res.clearCookie("electionTitle", { httpOnly: true, secure: false });
  }
  if (cookies?.userId) {
    res.clearCookie("userId", { httpOnly: true, secure: false });
  }
  res.json("logged out");
};

module.exports = logout;
