const express = require("express");
const database = require("./db");
const cors = require("cors");
const app = express();
const cofig = require("./config");
const helmet = require("helmet");
// const { usermodel, expensemodel, payment, forgetpassword } = require("./model");
const {
  userrouter,
  expenserouter,
  paymentrouter,
  paymentFeatures,
  resetpasswordrouter,
  userdetailsrouter,
} = require("./routers");

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userrouter);
app.use("/Expenses", expenserouter);
app.use("/payment", paymentrouter);
app.use("/paymentFeatures", paymentFeatures);
app.use("/Resest", resetpasswordrouter);
app.use("/userdeatils", userdetailsrouter);

// usermodel.hasMany(expensemodel);
// usermodel.hasMany(payment);
// expensemodel.belongsTo(usermodel);
// payment.belongsTo(usermodel);
// usermodel.hasMany(forgetpassword);
// forgetpassword.belongsTo(usermodel);

database()
  .then(() => {
    app.listen(cofig.port, () => console.log(`server start at ${cofig.port}`));
  })
  .catch((errors) => {
    console.log(errors);
  });
