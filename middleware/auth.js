const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get the token from header
  const token = req.header("auth"); //authetication -> standard
  // checj if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    next(); //move to next piece of the middleware
    
  } catch (err) {
    res.status(401).json({ msg: "The token is not valid" });
  }
};
