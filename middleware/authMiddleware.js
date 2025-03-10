const users = require("../db/models/user");
const jwt = require("jsonwebtoken");
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

    // Find user by ID
    const user = await users.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid Token. User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token." });
  }
};

module.exports = { authenticateUser };