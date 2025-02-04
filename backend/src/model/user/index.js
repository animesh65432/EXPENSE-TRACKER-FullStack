// const database = require("../../db");
// const DataTypes = require("sequelize");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ispremiumuser: {
    type: Boolean,
    default: false,
  },
  totalexpenses: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

// const User = database.define("user", {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   ispremiumuser: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false,
//   },
//   totalexpenses: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0,
//   },
// });

// module.exports = User;
