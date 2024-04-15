const express = require("express");
const database = require("./db");
const cors = require("cors");
const app = express();
const cofig = require("./config");
const { userrouter, expenserouter } = require("./routers");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userrouter);
app.use("/Expenses", expenserouter);

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
