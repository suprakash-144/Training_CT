const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  //  Generate JWT token with 1 day validity
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = { generateToken };
