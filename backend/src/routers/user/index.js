const express = require("express");
const controllers = require("../../controllers");
const router = express.Router();

router.post(
  "/singuptheuser",
  controllers.usercontroller.singuptheusercontroler
);
router.post("/loginuser", controllers.usercontroller.logintheuser);
module.exports = router;
