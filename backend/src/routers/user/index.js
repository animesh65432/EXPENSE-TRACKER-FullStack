const express = require("express");
const controllers = require("../../controllers");
const router = express.Router();

router.post(
  "/singuptheuser",
  controllers.usercontroller.singuptheusercontroler
);
module.exports = router;
