const usermodel = require("../../model/user");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const { auth } = require("../../middlewares");

const signuptheusercontroller = async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      message: "Invalid request: name, email, and password are required.",
    });
  }

  try {
    let existingUser = await usermodel.findOne({
      email: email,
    });

    if (existingUser) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newuser = new usermodel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newuser.save();

    let token = auth.CreateTheJwTokens({
      email: email,
      id: newuser.id,
      ispremiumuser: newuser.ispremiumuser,
    });
    return response.status(StatusCodes.OK).json({
      message: "Successfully created the user.",
      idtoken: token,
    });
  } catch (error) {
    console.error("Error in signuptheusercontroller:", error);
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error." });
  }
};

const logintheuser = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await usermodel.findOne({
      email: email,
    });

    if (!user) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User does not exist." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      let token = auth.CreateTheJwTokens({
        email: email,
        idtoken: user.id,
        ispremiumuser: user.ispremiumuser,
      });
      return response.status(StatusCodes.OK).json({
        message: "Successfully logged in.",
        idtoken: token,
      });
    } else {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Wrong password." });
    }
  } catch (error) {
    console.error("Error in logintheuser:", error);
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error." });
  }
};

module.exports = {
  signuptheusercontroller,
  logintheuser,
};
