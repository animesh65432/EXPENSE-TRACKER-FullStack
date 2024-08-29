const dotenv = require("dotenv");
dotenv.config();
// let obj = {
//   port: process.env.PORT,
//   databasename: process.env.databasename,
//   sqlpassword: process.env.sqlpassword,
//   SecrectPassword: process.env.serectPassword,
//   key_id: process.env.key_id,
//   key_secret: process.env.key_secret,
//   EmailForNodeMailer: process.env.email,
//   pass: process.env.pass,
//   Access_key: process.env.Access_key,
//   Secret_access_key: process.env.Secret_access_key,
//   Node_env: process.env.Node_env,
//   hostname: process.env.hostname,
// };

let obj = {
  port: process.env.PORT,
  dburl: process.env.DBURL,
  EmailForNodeMailer: process.env.EMAIL,
  pass: process.env.NODEEMAILPASSWORD,
  Razorpay_key_id: "",
  Razorpay_key_secret: "",
  Amazon_Access_key: process.env.AWSSECRECTKEY,
  Amazon_Secret_access_key: process.env.AWSSECRECTACESSKEY,
  Amazon_Bucket_Name: process.env.AWSS3BUCKETNAME,
  JsonWebSecrect: process.env.JSONWEBSECRECT,
  STRIPESECRECTKEY: process.env.STRIPESECRECTKEY,
};
console.log(obj);
module.exports = obj;
