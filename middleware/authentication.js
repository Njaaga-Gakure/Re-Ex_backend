const { verify } = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Invalid authentication");
  }
  const token = authHeader.split(" ")[1];

  try {
    const { userId, name } = verify(token, process.env.JWT_SECRET);
    req.user = { userId, name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid authentication");
  }
};

module.exports = auth;
