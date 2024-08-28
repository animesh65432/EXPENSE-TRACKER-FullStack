import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { makePremuinm } from "../../stroe/slices";
import { backendurl } from "../../utils";

const RazorpayPayment = () => {
  const idtoken = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const createRazorpayOrder = async () => {
    try {
      const result = await axios.post(
        `${backendurl}/payment/createpayment`,
        {
          amount: 2500,
          currency: "INR",
        },
        {
          headers: { idtoken: idtoken },
        }
      );

      const orderId = result.data.order.id;

      const options = {
        key: "rzp_test_oDPI9BzawwVmp3",
        amount: 2500000,
        currency: "INR",
        order_id: orderId,
        name: "Expense Tracker",
        description: "Thanks for purchasing",
        image:
          "https://assets-global.website-files.com/63e56114746188c54e2936e0/6488d31c5d5ab5cbc43c2895_Spend%20Management-1.png",
        handler: async (response) => {
          try {
            await axios.post(
              `${backendurl}/payment/updatepayment`,
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
            dispatch(makePremuinm(true));
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
    <button
      onClick={createRazorpayOrder}
      className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
    >
      Become Premium
    </button>
  );
};

export default RazorpayPayment;
