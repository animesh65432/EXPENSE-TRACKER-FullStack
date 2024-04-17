const express = require("express");
const { paymentfeatures } = require("../../controllers");
const { auth } = require("../../middlewares");
const router = express.Router();

router.get(
  "/ShowTheLeadersboard",
  auth.Authentication,
  paymentfeatures.ShowTheLeadersboard
);

module.exports = router;
