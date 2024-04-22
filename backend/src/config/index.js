const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  databasename: process.env.databasename,
  sqlpassword: process.env.sqlpassword,
  SecrectPassword: process.env.serectPassword,
  key_id: process.env.key_id,
  key_secret: process.env.key_secrect,
  EmailForNodeMailer: process.env.email,
  pass: process.env.pass,
  Access_key: process.env.Access_key,
  Secret_access_key: process.env.Secret_access_key,
};
