const razorpay = require("razorpay");
const { key_id, key_secret } = require("../../config");
const { StatusCodes } = require("http-status-codes");
const { payment } = require("../../model");

const createPayment = async (request, response) => {
  try {
    const rzp = new razorpay({
      key_id: "rzp_test_oDPI9BzawwVmp3",
      key_secret: "edBkWb9z7KQi6CmOMc59mcHv",
    });

    const amount = 2500;

    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        console.log(err);
      }
      let result = await request.user.createOrder({
        orderid: order.id,
        status: "PENDING",
      });
      response.status(StatusCodes.CREATED).json({ order, key_id: rzp.key_id });
    });
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something Went Wrong",
    });
  }
};

const updatePayment = async (request, response) => {
  try {
    const { payment_id, order_id } = request.body;
    console.log(payment_id, order_id);

    let order = await payment.findOne({ where: { orderid: order_id } });

    let promise1 = order.update({
      paymentid: payment_id,
      status: "SUCESS",
    });

    let promise2 = request.user.update({
      ispremiumuser: true,
    });

    Promise.all([promise1, promise2]).then(() => {
      return response
        .status(StatusCodes.OK)
        .json({ sucess: true, message: "Sucessfully Payment" });
    });
  } catch (error) {
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ sucess: false, message: "Internal server errors" });
  }
};

module.exports = {
  createPayment,
  updatePayment,
};
