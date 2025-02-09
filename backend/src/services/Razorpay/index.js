const Razorpay = require("razorpay")
const config = require("../../config")

const Instance = new Razorpay({
    key_id: config.Razorpay_key_id,
    key_secret: config.Razorpay_key_secret
})

module.exports = Instance