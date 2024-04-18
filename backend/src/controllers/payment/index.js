const razorpay = require("razorpay");
const { key_id, key_secret } = require("../../config");
const { StatusCodes } = require("http-status-codes");
const { payment } = require("../../model");
const database = require("../../db");

const createPayment = async (request, response) => {
  const t = await database.transaction();
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

      await t.commit();
      response.status(StatusCodes.CREATED).json({ order, key_id: rzp.key_id });
    });
  } catch (error) {
    await t.rollback();
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something Went Wrong",
    });
  }
};

const updatePayment = async (request, response) => {
  const t = await database.transaction();
  try {
    const { payment_id, order_id } = request.body;

    const order = await payment.findOne({ where: { orderid: order_id } });

    if (!order) {
      await t.rollback();
      return response.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Order not found",
      });
    }

    await Promise.all([
      order.update(
        { paymentid: payment_id, status: "SUCCESS" },
        { transaction: t }
      ),
      request.user.update({ ispremiumuser: true }, { transaction: t }),
    ]);

    await t.commit();
    return response.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully updated payment",
    });
  } catch (error) {
    console.error("Update payment error:", error);
    await t.rollback();
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
