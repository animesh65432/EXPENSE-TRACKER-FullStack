const { StatusCodes } = require("http-status-codes");
const { expensemodel } = require("../../model");
const { uploadAndShareFile } = require("../../services");

const CreatetheExpenses = async (request, response) => {
  try {
    const { ExpensesName, description, Category, Expenseamount } = request.body;
    const totalexpenses =
      Number(request.user.totalexpenses) + Number(Expenseamount);

    console.log(Expenseamount, "4 items");

    if (!ExpensesName || !description || !Category || !Expenseamount) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide all necessary fields" });
    }

    const expense = await expensemodel.create({
      ExpensesName,
      description,
      Category,
      Expenseamount,
      user: request.user,
    });

    await request.user.updateOne({
      totalexpenses: totalexpenses,
    });

    return response
      .status(StatusCodes.CREATED)
      .json({ message: "Successfully created expense", data: expense });
  } catch (error) {
    console.error("Create expense error:", error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

const GettheExpenses = async (request, response) => {
  try {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 5;

    const startIndex = (page - 1) * limit;

    const totalItems = await expensemodel.countDocuments({
      user: request.user._id,
    });
    const expenses = await expensemodel
      .find({ user: request.user._id })
      .skip(startIndex)
      .limit(limit);

    if (expenses.length === 0) {
      return response.status(StatusCodes.OK).json({
        data: expenses,
        totalItems: 0,
      });
    }

    return response.status(StatusCodes.OK).json({
      data: expenses,
      totalItems,
    });
  } catch (error) {
    console.error("Get expenses error:", error);
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const DeletheExpesnes = async (request, response) => {
  const ExpenseId = request.params.ExpenseId;
  try {
    let expenseitem = await expensemodel.findOne({
      _id: ExpenseId,
      user: request.user._id,
    });

    if (!expenseitem) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        sucess: false,
        data: "expense items did not find",
      });
    }

    let totalexpenses =
      Number(request.user.totalexpenses) - Number(expenseitem.Expenseamount);

    let Promiseone = expensemodel.findByIdAndDelete(ExpenseId);
    let PromiseTwo = request.user.updateOne({
      totalexpenses: totalexpenses,
    });

    await Promise.all([Promiseone, PromiseTwo]);

    return response
      .status(StatusCodes.OK)
      .json({ message: "Successfully deleted expense" });
  } catch (error) {
    console.error("Delete expense error:", error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server errors",
    });
  }
};

const UpdateExpense = async (request, response) => {
  try {
    const ExpenseId = request.params.ExpenseId;
    const { ExpensesName, description, Category, Expenseamount } = request.body;

    if (!ExpensesName || !description || !Category || !Expenseamount) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide all necessary fields" });
    }

    let expenseitem = await expensemodel.findOne({
      _id: ExpenseId,
      user: request.user._id,
    });

    if (!expenseitem) {
      return response.status(StatusCodes.NOT_FOUND).json({
        message: "Expense item not found",
      });
    }

    const oldExpenseAmount = expenseitem.Expenseamount;
    const newExpenseAmount = Number(Expenseamount);
    const totalexpenses =
      Number(request.user.totalexpenses) - oldExpenseAmount + newExpenseAmount;

    await expensemodel.findByIdAndUpdate(ExpenseId, {
      ExpensesName,
      description,
      Category,
      Expenseamount: newExpenseAmount,
    });

    await request.user.updateOne({
      totalexpenses: totalexpenses,
    });

    return response.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully updated expense",
    });
  } catch (error) {
    console.error("Update expense error:", error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const DowanloadTheExpenses = async (request, response) => {
  try {
    let user = request.user;

    if (!user.ispremiumuser) {
      return response
        .status(400)
        .json({ status: false, message: "User is not premiumuser" });
    }

    let expenseslist = await expensemodel.find({
      user: user._id,
    });

    let obj = JSON.stringify(expenseslist);
    let url = await uploadAndShareFile(obj);

    return response.status(200).json({
      sucess: true,
      dowanloadurl: url,
    });
  } catch (errors) {
    console.log(errors);

    return response.status(500).json({
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
  UpdateExpense,
};
