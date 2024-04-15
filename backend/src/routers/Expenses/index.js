const express = require("express");
const { expenseController } = require("../../controllers");
const router = express.Router();

router.post("/Create", expenseController.CreatetheExpenses);
router.get("/Get", expenseController.GettheExpenses);
router.delete("/delete/:ExpenseId", expenseController.DeletheExpesnes);

module.exports = router;
