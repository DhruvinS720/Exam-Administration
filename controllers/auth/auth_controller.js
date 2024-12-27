const errorConstants = require("../../constants/errorHandleConstants");
const bcrypt = require("bcrypt");
const User = require("../../models/users/users_model");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const Register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username) {
      return res.status(400).json({
        success: false,
        message: "username is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "password is required",
      });
    }
    if (!role) {
      return res.status(400).json({
        success: false,
        message: "role is required",
      });
    }
    const userExists = await User.findOne({ username: username });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User is already exists",
      });
    }
    const bcryptPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      password: bcryptPassword,
      role,
    });

    await newUser
      .save()
      .then(() => {
        res
          .status(201)
          .json({ success: true, message: "User register successfully" });
      })
      .catch((err) => {
        console.log("🚀 ~ Register ~ err:", err);
        return res.status(400).json({
          success: false,
          message: errorConstants.SIGN_UP_ERROR,
          data: null,
          error: err.message,
        });
      });
  } catch (error) {
    // console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: errorConstants.INTERNAL_SERVER_ERROR,
      data: null,
      error: error.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).json({
        success: false,
        message: "username is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "password is required",
      });
    }
    const userExists = await User.findOne({ username: username });
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "User does not found",
      });
    }

    const checkPassword = await bcrypt.compare(password, userExists.password);

    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "username or password is incorrect",
      });
    }

    const token = jwt.sign(
      { id: userExists._id, role: userExists.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      authToken: token,
      error: false,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: errorConstants.INTERNAL_SERVER_ERROR,
      data: null,
      error: error.message,
    });
  }
};

module.exports = { Register, Login };
