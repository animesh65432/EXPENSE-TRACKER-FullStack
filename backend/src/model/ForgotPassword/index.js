// const Sequlize = require("sequelize");
// const database = require("../../db");
const mongoose = require("mongoose");

const ForGotPassWordSchema = new mongoose.Schema({
  active: Boolean,
  expriesby: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const ForGotPassWord = mongoose.model("ForGotPassWord", ForGotPassWordSchema);

// const ForGotPassWord = database.define("ForgetPassWord", {
//   id: {
//     type: Sequlize.UUID,
//     allowNull: false,
//     primaryKey: true,
//   },
//   active: Sequlize.BOOLEAN,
//   expriesby: Sequlize.DATE,
// });

module.exports = ForGotPassWord;
