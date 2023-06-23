const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  try {
    if (token === "" || token === null || token === undefined) {
      logger.info("You are not authorized to send the request");
      let status = false;
      let message = "Validation Error";
      let error = {
        errors: [
          {
            value: `${token}`,
            msg: "You are not authorized to send the request",
            param: "x-auth-token",
            location: "header",
          },
        ],
      };
      let response = { status, message, error };
      res.status(401).send(response);
    } else {
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      req.user = decoded;
      next();
    }
  } catch (err) {
    logger.error("Invalid Token");
    let status = false;
    let message = "Validation Error";
    let error = {
      errors: [
        {
          value: `${token}`,
          msg: "Invalid Token",
          param: "x-auth-token",
          location: "header",
        },
      ],
    };
    let response = { status, message, error };
    res.status(403).send(response);
  }
}

module.exports = auth;
