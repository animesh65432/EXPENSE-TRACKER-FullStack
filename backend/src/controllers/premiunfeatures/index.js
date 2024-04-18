const { usermodel, expensemodel } = require("../../model");
const { StatusCodes } = require("http-status-codes");
const sequelize = require("sequelize");

const ShowTheLeadersboard = async (request, response) => {
  try {
    const LeaderBoards = await usermodel.findAll({
      attributes: [
        "id",
        "name",
        [
          sequelize.fn(
            "coalesce",
            sequelize.fn("sum", sequelize.col("Expenses.Expenseamount")),
            0
          ),
          "total_expense",
        ],
      ],
      include: [
        {
          model: expensemodel,
          attributes: [],
          required: false,
        },
      ],
      group: ["user.id"],
      order: [["total_expense", "DESC"]],
    });

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
