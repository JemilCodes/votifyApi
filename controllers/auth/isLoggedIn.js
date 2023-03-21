const UserModel = require("../../models/userModel");

const isLoggedIn = async (req, res) => {
  const { email } = req.cookies;

  const userData = await UserModel.findOne({ email });
  if (!userData) {
    return res.status(200).json("false");
  }
  if (userData.isLoggedIn) {
    return res.status(200).json("true");
  } else {
    return res.status(200).json("false");
  }
};

module.exports = isLoggedIn;
