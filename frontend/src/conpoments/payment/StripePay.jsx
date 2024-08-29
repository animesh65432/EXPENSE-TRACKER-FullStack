import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { makePremuinm } from "../../stroe/slices";
import { backendurl } from "../../utils";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { STRIPEPUBLISHKEY } from "../../utils";
import { toast, Toaster } from "react-hot-toast";
const stripePromise = loadStripe(STRIPEPUBLISHKEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const idtoken = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [amount] = useState(2500);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showCard, setShowCard] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    try {
      const {
        data: { clientSecret },
      } = await axios.post(
        `${backendurl}/payment/createpayment`,
        { amount },
        { headers: { idtoken } }
      );

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent.status === "succeeded") {
        await axios.post(
          `${backendurl}/payment/updatepayment`,
          { payment_id: paymentIntent.id, order_id: paymentIntent.id },
          { headers: { idtoken } }
        );
        dispatch(makePremuinm(true));
        setSuccessMessage("Payment succeeded!");
        setErrorMessage("");
        toast.success("Payment succeeded!");
      }
    } catch (error) {
      setErrorMessage("Payment failed.");
      toast.error("Payment failed.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      {!showCard ? (
        <div className="text-center">
          <button
            onClick={() => setShowCard(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Become Premium
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white w-96">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                    padding: "12px",
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          <div className="text-center mt-4">
            <p className="text-xl mb-4">
              Total Amount: ${(amount / 100).toFixed(2)}
            </p>
            <button
              type="submit"
              disabled={!stripe}
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Complete Payment
            </button>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center mt-4">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-center mt-4">
              {successMessage}
            </div>
          )}
        </form>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

function StripePayment() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default StripePayment;
