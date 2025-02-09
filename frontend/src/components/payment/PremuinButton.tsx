import React from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { useSelector, useDispatch } from "react-redux"
import { Rootstate } from "@/stroe"
import { backendurl } from "@/utils"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { makeuserPremuin } from "@/stroe/slices/user"
const PaymentButton: React.FC = () => {
  const idtoken = useSelector((state: Rootstate) => state.user.value)
  const UserDeatils = useSelector((state: Rootstate) => state.userDetails.user)
  const dispatch = useDispatch()
  const { toast } = useToast()
  const handlePayment = async () => {
    try {
      const response = await axios.post(`${backendurl}/payment/createpayment`, {
        amount: 500,
        currency: 'INR',
      }, {
        headers: {
          idtoken: idtoken,
        },
      });

      const { id: order_id, } = response.data;
      console.log(response.data)
      const options = {
        key: import.meta.env.Razorpay_key_Id as string,
        amount: 50000,
        currency: 'INR',
        name: "Savewave",
        description: "Test Transaction",
        order_id: order_id,
        handler: async (response: any) => {
          toast({
            title: `Payment Successful!`
          })

          try {
            const verificationResponse = await axios.post(`${backendurl}/payment/updatepayment`, {
              order_id: response.razorpay_order_id,
            }, {
              headers: {
                idtoken: idtoken,
              }
            });

            const { success } = verificationResponse.data
            if (success) {
              toast({
                title: `Payment Sucessfull happen`,
              })
              dispatch(makeuserPremuin())
            }
            else {
              toast({
                title: `Payment failed`,
                variant: "destructive",
                action: <ToastAction altText="Try again">Try again later</ToastAction>
              })
            }

          } catch (error) {
            toast({
              title: `Payment  failed`,
              variant: "destructive",
              action: <ToastAction altText="Try again">Try again later</ToastAction>
            })
          }
        },
        prefill: {
          name: `${UserDeatils?.name}`,
          email: `${UserDeatils?.email}`,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      toast({
        title: `Payment  failed`,
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again later</ToastAction>
      })

    }
  };

  return <Button onClick={handlePayment} className='bg-black hover:bg-slate-900'>Active Premuin</Button>;
};

export default PaymentButton;