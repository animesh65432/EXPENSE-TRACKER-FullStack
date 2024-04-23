const { usermodel } = require("../../model");
const { StatusCodes } = require("http-status-codes");
const database = require("../../db");

const GettheUser = async (request, response) => {
  try {
    const id = request.user.id;

    const user = await usermodel.findAll({
      where: {
        id: id,
      },
    });

    return response.status(StatusCodes.OK).json({
      success: true,
      data: user,
    });
  } catch (errors) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const UpdateUser = async (request, response) => {
  const t = await database.transaction();

  try {
    const id = request.user.id;
    const { name, email } = request.body;

    let updateuser = usermodel.update(
      {
        name: name,
        email: email,
      },
      {
        where: {
          id: id,
        },
        transaction: t,
      }
    );

    let user = usermodel.findAll({
      where: {
        id: id,
      },
      transaction: t,
    });

    await Promise.all([updateuser, user]);

    await t.commit();

    return response.status(StatusCodes.OK).json({
      success: true,
      data: user,
    });
  } catch (error) {
    await t.rollback();
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
