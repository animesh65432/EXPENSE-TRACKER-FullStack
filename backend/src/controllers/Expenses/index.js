const { StatusCodes } = require("http-status-codes");
const { expensemodel } = require("../../model");

const CreatetheExpenses = async (request, response) => {
  try {
    const { ExpensesName, description, Category, Expenseamount } = request.body;
    if (!ExpensesName && !description && !Category && Expenseamount)
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "please Put Each and Everything" });

    let expesne = await expensemodel.create({
      ExpensesName: ExpensesName,
      description: description,
      Category: Category,
      Expenseamount: Expenseamount,
      userId: request.user.id,
    });

    return response
      .status(StatusCodes.CREATED)
      .json({ messsage: "Sucessfully create it expesnses" });
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Errors",
    });
  }
};

const GettheExpenses = async (request, response) => {
  try {
    let AlltheExpenses = await expensemodel.findAll({
      where: {
        userId: request.user.id,
      },
    });
    return response.status(StatusCodes.OK).json({ data: AlltheExpenses });
  } catch (error) {
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server errors" });
  }
};

const DeletheExpesnes = async (request, response) => {
  try {
    const ExpenseId = request.params.ExpenseId;

    await expensemodel.destroy({
      where: {
        id: ExpenseId,
        userId: request.user.id,
      },
    });

    return response
      .status(StatusCodes.OK)
      .json({ message: "Sucessfully delete it" });
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server errors",
    });
  }
};

module.exports = {
  CreatetheExpenses,
  GettheExpenses,
  DeletheExpesnes,
};