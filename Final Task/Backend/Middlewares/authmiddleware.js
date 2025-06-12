const jwt = require("jsonwebtoken");
const User = require("../Models/Team");
const authMiddleware = async (req, res, next) => {
  var token;
  //  check if token exist or not
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        //verifing the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        //  store user in request
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(401);
      const err = new Error("Not authorized token expired,please login agian");
      next(err);
    }
  } else {
    const err = new Error("Token not attached");
    res.status(401);
    next(err);
  }
};

module.exports = { authMiddleware };
