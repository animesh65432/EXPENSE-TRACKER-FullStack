const { usermodel, expensemodel } = require("../../model");
const { StatusCodes } = require("http-status-codes");

const ShowTheLeadersboard = async (request, response) => {
  try {
    let expensesitems = await expensemodel.findAll({});
    let users = await usermodel.findAll({});

    let userwithexpense = {};

    expensesitems.forEach((expense, index) => {
      if (userwithexpense[expense.userId]) {
        userwithexpense[expense.userId] += expense.Expenseamount;
      } else {
        userwithexpense[expense.userId] = expense.Expenseamount;
      }
    });

    const LeaderBoards = [];

    users.forEach((user) => {
      LeaderBoards.push({
        user: user.name,
        total_expense: userwithexpense[user.id] || 0,
      });
    });

    return response
      .status(StatusCodes.OK)
      .json({ success: true, data: LeaderBoards });
  } catch (error) {
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ errors: error });
  }
};

module.exports = {
  ShowTheLeadersboard,
};
