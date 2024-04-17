const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  databasename: process.env.databasename,
  sqlpassword: process.env.sqlpassword,
  SecrectPassword: process.env.serectPassword,
  key_id: process.env.key_id,
  key_secret: process.env.key_secrect,
};
