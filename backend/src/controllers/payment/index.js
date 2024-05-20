const razorpay = require("razorpay");
const { key_id, key_secret } = require("../../config");
const { StatusCodes } = require("http-status-codes");
const { payment } = require("../../model");

const createPayment = async (request, response) => {
  try {
    const rzp = new razorpay({
      key_id: key_id,
      key_secret: key_secret,
    });

    const amount = 2500;

    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        console.log(err);
      }

      let result = await payment.create({
        orderid: order.id,
        status: "pending",
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

    const order = await payment.findOne({ orderid: order_id });

    if (!order) {
      return response.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Order not found",
      });
    }

    await Promise.all([
      order.updateOne({ paymentid: payment_id, status: "SUCCESS" }),
      request.user.updateOne({ ispremiumuser: true }),
    ]);

    return response.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully updated payment",
    });
  } catch (error) {
    console.error("Update payment error:", error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createPayment,
  updatePayment,
};
