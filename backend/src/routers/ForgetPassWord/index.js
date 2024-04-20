const express = require("express");
const forgetpasswordcontroler = require("../../controllers/resetpasswords");
const router = express.Router();

router.post("/forgetpassword", forgetpasswordcontroler.forgotpassword);

router.put("/updatePasswords", forgetpasswordcontroler.updatePassword);

module.exports = router;
