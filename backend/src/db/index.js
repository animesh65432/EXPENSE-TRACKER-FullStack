// const { Sequelize } = require("sequelize");
// const config = require("../config");
// const database = new Sequelize({
//   database: config.databasename,
//   host: config.hostname,
//   password: config.sqlpassword,
//   username: "root",
//   dialect: "mysql",
// });

const mongoose = require("mongoose");

async function connectodatabase() {
  try {
    let response = await mongoose.connect(
      "mongodb://127.0.0.1:27017/ExpenseTracker"
    );

    return response;
  } catch (error) {
    return error;
  }
}

module.exports = connectodatabase;
