// const database = require("../../db");
// const { Sequelize, DataTypes } = require("sequelize");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  paymentid: String,
  orderid: String,
  status: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;

// const Order = database.define("Order", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   paymentid: {
//     type: DataTypes.STRING,
//   },
//   orderid: {
//     type: DataTypes.STRING,
//   },
//   status: {
//     type: DataTypes.STRING,
//   },
// });

// module.exports = Order;
