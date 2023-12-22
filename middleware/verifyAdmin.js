const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "You are not logged in",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({phone: decoded.phone});

    if (!user) {
      return res.status(403).json({
        success: false,
        error: "User Not Found",
      });
    }
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Forbidden access",
      });
    }
    if (user.role === "admin") {
      next();
    }
  } catch (error) {
    res.status(403).json({
      success: false,
      error: error.message,
    });
  }
};
