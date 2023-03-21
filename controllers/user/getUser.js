const userModel = require("../../models/userModel");

const getUser = async (req, res) => {
  const { name, email, joined, _id } = await userModel.findById(
    req.cookies.userId
  );
  return res.status(200).json({ name, email, joined, _id });
};

module.exports = getUser;
