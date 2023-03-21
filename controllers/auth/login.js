const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/userModel");

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(200).json("invalidLogin");
  }
  const userData = await UserModel.findOne({ email }).exec();
  if (!userData) {
    return res.status(200).json("userDoesNotExist");
  }
  const isPasswordCorrect = await bcrypt.compare(password, userData.password);
  if (isPasswordCorrect) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          name: userData.name,
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
      // secure: true,          //https
      // sameSite: "None",     //cross-site cookie
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
    if (!logged) {
      return res.status(200).json("serverError");
    }

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
  } else {
    return res.status(200).json("youArenotAuthorizeToAccessThisRoute");
  }
}

module.exports = login;
