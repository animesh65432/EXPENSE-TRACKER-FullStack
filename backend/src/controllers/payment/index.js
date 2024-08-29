const config = require("../../config");
const stripe = require("stripe")(config.STRIPESECRECTKEY);
const { payment } = require("../../model");

const createPayment = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      payment_method_types: ["card"],
    });

    await payment.create({
      orderid: paymentIntent.id,
      status: "pending",
    });

    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};
const updatePayment = async (request, response) => {
  try {
    const { payment_id, order_id } = request.body;

    const order = await payment.findOne({ orderid: order_id });

    if (!order) {
      return response.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Promise.all([
      order.updateOne({ paymentid: payment_id, status: "SUCCESS" }),
      request.user.updateOne({ ispremiumuser: true }),
    ]);

    return response.status(200).json({
      success: true,
      message: "Successfully updated payment",
    });
  } catch (error) {
    console.error("Update payment error:", error);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createPayment,
  updatePayment,
};
