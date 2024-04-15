const model = require("../../model");
const { StatusCodes } = require("http-status-codes");

const singuptheusercontroler = async (request, response) => {
  const { name, email, password } = request.body;

  if (!name && !email && !password)
    return response.status(StatusCodes.BAD_REQUEST).json({
      message: "Invaild request",
    });

  try {
    let exsitinuser = await model.usermodel.findOne({
      where: {
        email: email,
      },
    });
    console.log(exsitinuser);
    if (exsitinuser)
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ user: "User alredy exsit" });
    let res = await model.usermodel.create({
      name: name,
      email: email,
      password: password,
    });

    return response
      .status(StatusCodes.OK)
      .json({ message: "Sucesfully Create The User" });
  } catch (error) {
    console.log(error);
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internale server errors" });
  }
};

const logintheuser = async (request, response) => {
  const { email } = request.body;

  try {
    let exsitinuser = await model.usermodel.findOne({
      where: {
        email: email,
      },
    });

    if (!exsitinuser)
      return response
        .status(StatusCodes.OK)
        .json({ message: "Users has been never created" });

    return response
      .status(StatusCodes.OK)
      .json({ message: "Sucessfully log in" });
  } catch (error) {
    console.log(error);

    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ meessage: "Internal Server errors" });
  }
};
module.exports = {
  singuptheusercontroler,
  logintheuser,
};
