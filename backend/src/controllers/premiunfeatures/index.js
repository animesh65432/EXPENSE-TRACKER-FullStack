const { usermodel } = require("../../model");
const { StatusCodes } = require("http-status-codes");

const ShowTheLeadersboard = async (request, response) => {
  try {
    const LeaderBoards = await usermodel.find({}).sort({ totalexpenses: -1 });

    return response
      .status(StatusCodes.OK)
      .json({ success: true, data: LeaderBoards });
  } catch (error) {
    console.log(error);
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ errors: error });
  }
};

module.exports = {
  ShowTheLeadersboard,
};
