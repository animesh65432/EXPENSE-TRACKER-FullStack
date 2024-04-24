const express = require("express");
const database = require("./db");
const cors = require("cors");
const app = express();
const cofig = require("./config");
const helmet = require("helmet");
const { Node_env } = require("./config");
const path = require("path");
const { usermodel, expensemodel, payment, forgetpassword } = require("./model");
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

//------------Deployment --------
const __dirname1 = path.resolve();
if (Node_env == "production") {
  app.use(express.static(path.join(__dirname1, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "../frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res, next) => {
    res.send("Api is running");
  });
}
//------------Deployment ------------

usermodel.hasMany(expensemodel);
usermodel.hasMany(payment);
expensemodel.belongsTo(usermodel);
payment.belongsTo(usermodel);
usermodel.hasMany(forgetpassword);
forgetpassword.belongsTo(usermodel);

database
  .sync()
  .then(() => {
    app.listen(cofig.port, () => {
      console.log(`you server you port at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
