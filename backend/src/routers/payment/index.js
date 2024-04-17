const express = require("express");
const { paymentController } = require("../../controllers");
const { auth } = require("../../middlewares");
const router = express.Router();

router.post(
  "/createpayment",
  auth.Authentication,
  paymentController.createPayment
);

router.post(
  "/updatepayment",
  auth.Authentication,
  paymentController.updatePayment
);

module.exports = router;
