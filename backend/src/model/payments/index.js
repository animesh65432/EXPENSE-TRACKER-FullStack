const database = require("../../db");
const { Sequelize, DataTypes } = require("sequelize");

const Order = database.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  paymentid: {
    type: DataTypes.STRING,
  },
  orderid: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
});

module.exports = Order;
