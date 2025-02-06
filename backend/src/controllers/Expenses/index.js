const { StatusCodes } = require("http-status-codes");
const { expensemodel } = require("../../model");
const { uploadAndShareFile } = require("../../services");
const ejs = require("ejs")
const path = require("path")
const puppeteer = require("puppeteer")
const { readFileSync } = require("fs");
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

    const [expenses, totalItems] = await Promise.all([
      expensemodel.find({ user: request.user._id }).skip(startIndex).limit(limit),
      expensemodel.countDocuments({ user: request.user._id }),
    ]);

    const totalPages = Math.ceil(totalItems / limit)
    return response.status(StatusCodes.OK).json({
      success: true,
      data: expenses,
      totalItems,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Get expenses error:", error);
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal server error" });
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

    if (!ExpensesName || !description || !Category || !Expenseamount || !ExpenseId) {
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

    const UpdateExpense = await expensemodel.findByIdAndUpdate(ExpenseId, {
      ExpensesName,
      description,
      Category,
      Expenseamount: newExpenseAmount,
    }, { new: true });

    await request.user.updateOne({
      totalexpenses: totalexpenses,

    });

    return response.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully updated expense",
      UpdateExpense
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

    let expenses = await expensemodel.find({
      user: user._id,
    });

    console.log(expenses)

    const totalexpenses = expenses.reduce((acc, expense) => expense.Expenseamount + acc, 0)

    const html = await ejs.renderFile(path.join(__dirname, "../../views/index.ejs"), { expenses })

    console.log(html, "it's html")
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    })

    console.log(browser)

    const page = await browser.newPage()

    console.log(page)

    await page.setContent(html, { waitUntil: "load" })

    await page.emulateMediaType('screen');
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();
    response.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="expenses.pdf"`,
    });
    return response.status(200).json({
      message: "download the expense"
    })
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
