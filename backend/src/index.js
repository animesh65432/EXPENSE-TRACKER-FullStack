const express = require("express");
const database = require("./db");
const cors = require("cors");
const app = express();
const cofig = require("./config");
const helmet = require("helmet");
const path = require("path")
// const { usermodel, expensemodel, payment, forgetpassword } = require("./model");
const {
  userrouter,
  expenserouter,
  paymentrouter,
  paymentFeatures,
  resetpasswordrouter,
  userdetailsrouter,
} = require("./routers");
const { createdummyuser } = require("./utils")

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "*",
    credentials: true,
  })
);

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

console.log("Views directory:", path.join(__dirname, 'views'));


app.get("/", async (req, res) => {
  try {
    res.render("hello/index")
  } catch (error) {
    console.log(`something went wrong`)
  }
})


database()
  .then(() => {
    app.listen(cofig.port, () => {
      createdummyuser({ name: "testname", email: "test@gmail.com", password: "testpasword" })
      console.log(`server start at ${cofig.port}`)
    });
  })
  .catch((errors) => {
    console.log(errors);
  });
module.exports = app;
