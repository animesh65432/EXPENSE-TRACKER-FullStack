const { StatusCodes } = require("http-status-codes");
const { expensemodel } = require("../../model");
const { uploadAndShareFile } = require("../../services");
const database = require("../../db");
const CreatetheExpenses = async (request, response) => {
  const t = await database.transaction();
  try {
    const { ExpensesName, description, Category, Expenseamount } = request.body;
    const totalexpenses =
      Number(request.user.totalexpenses) + Number(Expenseamount);

    if (!ExpensesName || !description || !Category || !Expenseamount) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide all necessary fields" });
    }

    const expense = await expensemodel.create(
      {
        ExpensesName,
        description,
        Category,
        Expenseamount,
        userId: request.user.id,
      },
      { transaction: t }
    );

    await request.user.update(
      {
        totalexpenses,
      },
      {
        transaction: t,
      }
    );

    await t.commit();

    return response
      .status(StatusCodes.CREATED)
      .json({ message: "Successfully created expense" });
  } catch (error) {
    await t.rollback();
    console.error("Create expense error:", error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

const GettheExpenses = async (request, response) => {
  try {
    const AlltheExpenses = await expensemodel.findAll({
      where: {
        userId: request.user.id,
      },
    });
    return response.status(StatusCodes.OK).json({ data: AlltheExpenses });
  } catch (error) {
    console.error("Get expenses error:", error);
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server errors" });
  }
};

const DeletheExpesnes = async (request, response) => {
  const t = await database.transaction();
  try {
    const ExpenseId = request.params.ExpenseId;

    let expenseitem = await expensemodel.findOne(
      {
        where: {
          id: ExpenseId,
          userId: request.user.id,
        },
      },
      {
        transaction: t,
      }
    );

    console.log(expenseitem.Expenseamount);

    let totalexpenses =
      Number(request.user.totalexpenses) - Number(expenseitem.Expenseamount);

    let Promiseone = expenseitem.destroy({
      transaction: t,
    });
    let PromiseTwo = request.user.update(
      {
        totalexpenses: totalexpenses,
      },
      {
        transaction: t,
      }
    );

    await Promise.all([Promiseone, PromiseTwo]);
    await t.commit();
    return response
      .status(StatusCodes.OK)
      .json({ message: "Successfully deleted expense" });
  } catch (error) {
    await t.rollback();
    console.error("Delete expense error:", error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server errors",
    });
  }
};

const DowanloadTheExpenses = async (request, response) => {
  console.log("Okay");
  try {
    let user = request.user;

    if (!user.ispremiumuser) {
      return response
        .status(StatusCodes.FORBIDDEN)
        .json({ status: false, message: "User is not premiumuser" });
    }

    let expenseslist = await expensemodel.findAll({
      where: {
        userId: user.id,
      },
    });

    let obj = JSON.stringify(expenseslist);
    let url = await uploadAndShareFile(obj);

    return response.status(StatusCodes.OK).json({
      sucess: true,
      dowanloadurl: url,
    });
  } catch (errors) {
    console.log(errors);

    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      sucess: false,
      message: "internal server errors",
    });
  }
};

module.exports = {
  CreatetheExpenses,
  GettheExpenses,
  DeletheExpesnes,
  DowanloadTheExpenses,
};
