const { Sequelize } = require("sequelize");
const config = require("../config");

const database = new Sequelize({
  database: config.databasename,
  host: "localhost",
  password: config.sqlpassword,
  username: "root",
  dialect: "mysql",
});



module.exports = database;
