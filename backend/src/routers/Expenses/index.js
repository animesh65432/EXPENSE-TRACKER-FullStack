const express = require("express");
const { expenseController } = require("../../controllers");
const router = express.Router();
const { auth } = require("../../middlewares");

router.post(
  "/Create",
  auth.Authentication,
  expenseController.CreatetheExpenses
);
router.get("/Get", auth.Authentication, expenseController.GettheExpenses);
router.delete(
  "/delete/:ExpenseId",
  auth.Authentication,
  expenseController.DeletheExpesnes
);

router.post(
  "/dowaloadtheexpenses",
  auth.Authentication,
  expenseController.DowanloadTheExpenses
);
module.exports = router;
