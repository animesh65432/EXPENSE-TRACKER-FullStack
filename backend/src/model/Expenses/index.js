const database = require("../../db");
const { DataTypes } = require("sequelize");

const Expenses = database.define("Expenses", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ExpensesName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Expenses;
