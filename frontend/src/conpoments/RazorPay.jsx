import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const RazorpayPayment = () => {
  const idtoken = useSelector((state) => state.user.value);
  const createRazorpayOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/payment/createpayment",
        {
          amount: 2500,
          currency: "INR",
        },
        {
          headers: { idtoken: idtoken },
        }
      );

      const orderId = response.data.order.id;

      const options = {
        key: "rzp_test_oDPI9BzawwVmp3",
        amount: 2500,
        currency: "INR",
        order_id: orderId,
        name: "Expense Tracker",
        description: "Thanks For Purchaseing",
        image:
          "https://assets-global.website-files.com/63e56114746188c54e2936e0/6488d31c5d5ab5cbc43c2895_Spend%20Management-1.png",
        handler: async (response) => {
          try {
            const result = await axios.post(
              "http://localhost:3000/payment/updatepayment",
              {
                payment_id: response.razorpay_payment_id,
                order_id: orderId,
              },
              {
                headers: {
                  idtoken: idtoken,
                },
              }
            );
            console.log(result.data);
          } catch (err) {
            console.log(err);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  };

  return (
    <div>
      <button onClick={createRazorpayOrder}>Pay with Razorpay</button>
    </div>
  );
};

export default RazorpayPayment;
