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
const config = require("../config");

async function connectodatabase() {
  try {
    let response = await mongoose.connect(config.dburl);
    console.log("Sucessfully connected to the database", config.dburl);
    return response;
  } catch (error) {
    console.log(error, "did not connect to database");
    return error;
  }
}

module.exports = connectodatabase;
