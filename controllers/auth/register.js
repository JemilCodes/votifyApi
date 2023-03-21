const { StatusCodes } = require("http-status-codes");
const UserModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(StatusCodes.OK).json("invalidRegister");
  }
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    return res.status(StatusCodes.OK).json("userAlreadyExist");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashsedPassword = await bcrypt.hash(password, salt);
    const temptUser = {
      name,
      email,
      password: hashsedPassword,
      joined: Date(),
      isLoggedIn: false,
    };
    const userData = await UserModel.create(temptUser);

    if (!userData) {
      return res.status(200).json("serverError");
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          name,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", accessToken, {
      httpOnly: true, //accessible only by web server
      // secure: true, //https
      // sameSite: "None", //cross-site cookie
      maxAge: 1 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    res.cookie("userId", userData._id, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 1 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    res.cookie("email", userData.email, {
      httpOnly: true, //accessible only by web server
      // secure: true,          //https
      // sameSite: "None",     //cross-site cookie
      maxAge: 1 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    const logged = await UserModel.findOneAndUpdate(
      { email },
      { isLoggedIn: true },
      { new: true, runValidators: true }
    );

    if (logged.isLoggedIn === true) {
      const { name, email, joined, isLoggedIn } = logged;
      const user = {
        name,
        email,
        joined,
        isLoggedIn,
      };
      return res.status(StatusCodes.ACCEPTED).json({ user });
    } else {
      return res.status(200).json("serverError");
    }
  }
};
module.exports = register;
