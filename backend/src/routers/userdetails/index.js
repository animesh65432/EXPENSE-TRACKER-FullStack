const express = require("express");
const { userdeatilscontroller } = require("../../controllers");
const { auth } = require("../../middlewares");
const router = express.Router();

router.get("/GetUser", auth.Authentication, userdeatilscontroller.GettheUser);
router.put(
  "/Updateuser",
  auth.Authentication,
  userdeatilscontroller.UpdateUser
);

module.exports = router;
