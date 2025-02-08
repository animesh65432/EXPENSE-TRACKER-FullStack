// const database = require("../../db");
// const { DataTypes } = require("sequelize");
const mongoose = require("mongoose");
const { create } = require("../user");
const statusEnum = ["dress" | "grocery" | "books" | "others"];

const ExpensesSchmea = new mongoose.Schema({
  ExpensesName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    enum: statusEnum,
    required: true
  },
  Expenseamount: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Expenses = mongoose.model("Expenses", ExpensesSchmea);
module.exports = Expenses;
// const Expenses = database.define("Expenses", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   ExpensesName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   Category: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   Expenseamount: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     defaultValue: 0,
//   },
// });
