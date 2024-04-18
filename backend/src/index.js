const express = require("express");
const database = require("./db");
const cors = require("cors");
const app = express();
const cofig = require("./config");
const { usermodel, expensemodel, payment } = require("./model");
const {
  userrouter,
  expenserouter,
  paymentrouter,
  paymentFeatures,
} = require("./routers");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userrouter);
app.use("/Expenses", expenserouter);
app.use("/payment", paymentrouter);
app.use("/paymentFeatures", paymentFeatures);

usermodel.hasMany(expensemodel);
usermodel.hasMany(payment);
expensemodel.belongsTo(usermodel);
payment.belongsTo(usermodel);

database
  .sync({ force: true })
  .then(() => {
    app.listen(cofig.port, () => {
      console.log(`you server you port at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
