const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  databasename: process.env.databasename,
  sqlpassword: process.env.sqlpassword,
  SecrectPassword: process.env.serectPassword,
};
