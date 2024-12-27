const jwt = require("jsonwebtoken");

const verifyTokenUserAndAdmin = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({
        success: false,
        message: "unauthorized request",
        data: null,
        error: true,
      });
    }
    next();
  } catch (error) {
    next(createError(401, error));
  }
};

const verifyTokenUser = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (verifyToken.role === "Student") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Only user can allowed to perform this action",
        data: null,
        error: true,
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: error.message, data: null, error });
  }
};

const verifyTokenAdmin = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (verifyToken.role === "Admin") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Only admin can allowed to perform this action",
        data: null,
        error: true,
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: error.message, data: null, error });
  }
};

module.exports = { verifyTokenUserAndAdmin, verifyTokenUser, verifyTokenAdmin };
