const { StatusCodes } = require("http-status-codes");
const { expensemodel } = require("../../model");
const { uploadAndShareFile } = require("../../services");
const ejs = require("ejs")
const path = require("path")
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

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

    const expenses = await expensemodel.find({ user: request.user._id })

    return response.status(StatusCodes.OK).json({
      success: true,
      data: expenses
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
        .json({ status: false, message: "User is not a premium user" });
    }

    let expenses = await expensemodel.find({ user: user._id });

    const totalexpenses = expenses.reduce((acc, cur) => acc + cur.Expenseamount, 0)

    // Generate HTML content from EJS
    const htmlContent = await new Promise((resolve, reject) => {
      response.render("index", { expenses, totalexpenses }, (err, html) => {
        if (err) reject(err);
        else resolve(html);
      });
    });

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(),
      headless: true, // Keep true for best performance
      args: chromium.args, // Required arguments for Render
    });
    const page = await browser.newPage();

    try {
      await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

      const pdfBuffer = await page.pdf({ format: "A4" });

      // Set headers before sending the PDF
      response.setHeader("Content-Type", "application/pdf");
      response.setHeader("Content-Disposition", 'attachment; filename="Expense.pdf"');
      response.setHeader("Content-Length", pdfBuffer.length);

      response.end(pdfBuffer);
    } finally {
      await browser.close();
    }

  } catch (errors) {
    console.error("PDF Generation Error:", errors);
    return response.status(500).json({
      success: false,
      message: "Internal server error",
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
