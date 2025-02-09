const RazorpayIstances = require("../../services/Razorpay")
const { payment } = require("../../model");

const createPayment = async (req, res) => {
  const { amount } = req.body;

  try {

    const options = {
      amount: amount * 100,
      currency: 'INR',
    };

    const order = await RazorpayIstances.orders.create(options)

    await payment.create({
      orderid: order.id,
      status: "pending",
      user: req.user._id
    })

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Something Went Wrong${error}`,
    });
  }
};
const updatePayment = async (request, response) => {
  try {
    const { order_id } = request.body;

    const order = await payment.findOne({ orderid: order_id });

    if (!order) {
      return response.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Promise.all([
      order.updateOne({ status: "SUCCESS" }),
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
  updatePayment
};
