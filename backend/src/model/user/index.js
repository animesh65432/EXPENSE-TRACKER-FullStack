const database = require("../../db");
const DataTypes = require("sequelize");

const User = database.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ispremiumuser: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  totalexpenses: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = User;
