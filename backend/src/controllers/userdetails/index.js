const { usermodel } = require("../../model");
const { StatusCodes } = require("http-status-codes");
const database = require("../../db");

const GettheUser = async (request, response) => {
  try {
    const _id = request.user._id;

    const user = await usermodel.findOne({
      _id: _id,
    });

    return response.status(StatusCodes.OK).json({
      success: true,
      data: [user],
    });
  } catch (errors) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const UpdateUser = async (request, response) => {
  try {
    const id = request.user._id;
    const { name, email } = request.body;

    let updateuser = usermodel.findByIdAndUpdate(id, {
      name: name,
      email: email,
    });

    let user = usermodel.findById(id);

    await Promise.all([updateuser, user]);

    return response.status(StatusCodes.OK).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  GettheUser,
  UpdateUser,
};
