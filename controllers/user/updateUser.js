const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res) => {
  const { userId } = req.cookies;
  const { oldPassword, newPassword } = req.body;

  if ((oldPassword, newPassword)) {
    const prevData = await userModel.findById(userId);
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      prevData.password
    );
    if (!isPasswordCorrect) res.status(401).json("incorrect password");

    const salt = await bcrypt.genSalt(10);
    const hashsedPassword = await bcrypt.hash(newPassword, salt);

    const data = await userModel.findByIdAndUpdate(
      userId,
      { ...req.body, password: hashsedPassword },
      { new: true, runValidators: true }
    );
    return res.status(200).json(data);
  } else {
    const data = await userModel.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json(data);
  }
};

module.exports = updateUser;
