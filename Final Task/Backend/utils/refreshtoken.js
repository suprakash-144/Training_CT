const jwt = require("jsonwebtoken");

const generateRefreshToken = (id) => {
  //  Generate JWT token with 3 days validity
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

module.exports = { generateRefreshToken };
