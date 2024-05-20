const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { usermodel } = require("../../model");
const { SecrectPassword } = require("../../config");

const CreateTheJwTokens = (obj) => {
  const tokens = jwt.sign(obj, SecrectPassword, {
    expiresIn: "15d",
  });
  return tokens;
};

const Authentication = async (req, res, next) => {
  const Authenticationtoken = req.header("idtoken");

  try {
    let verify = jwt.verify(Authenticationtoken, SecrectPassword);
    const { email } = verify;
    const user = await usermodel.findOne({
      email: email,
    });

    if (!user)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized request" });

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid token" });
    } else {
      console.error("JWT Verification Error:", error.message);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }
};

module.exports = {
  CreateTheJwTokens,
  Authentication,
};
