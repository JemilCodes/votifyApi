const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res) => {
  const { userId } = req.cookies;
  const { name, email, comfirm, password } = req.body;

  const prevData = await userModel.findById(userId);
  const isPasswordCorrect = await bcrypt.compare(comfirm, prevData.password);
  if (!isPasswordCorrect) res.status(401).json("incorrect password");

  const salt = await bcrypt.genSalt(10);
  const hashsedPassword = await bcrypt.hash(password, salt);

  const data = await userModel.findByIdAndUpdate(
    userId,
    { name, email, password: hashsedPassword },
    { new: true, runValidators: true }
  );
  return res.status(200).json(data);
};

module.exports = updateUser;
