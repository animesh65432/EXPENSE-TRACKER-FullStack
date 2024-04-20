const Sequlize = require("sequelize");
const database = require("../../db");

const ForGotPassWord = database.define("ForgetPassWord", {
  id: {
    type: Sequlize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  active: Sequlize.BOOLEAN,
  expriesby: Sequlize.DATE,
});

module.exports = ForGotPassWord;
