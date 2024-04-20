import React, { useState } from "react";
import useResetPassword from "../hooks/useResetPassword";

const ResetPassword = () => {
  const [Email, SetEmail] = useState("");
  const [SentTheEmail] = useResetPassword();
  const Onsubmithandler = (e) => {
    e.preventDefault();

    if (Email.length == 0) {
      return;
    } else {
      let result = SentTheEmail({
        email: Email,
      });

      if (result) {
        console.log("Please Check Your Email");
      } else {
        console.log("Something Went Wrong");
      }
    }
  };

  return (
    <>
      <form onSubmit={Onsubmithandler}>
        <label htmlFor="Email">Email</label>
        <input
          id="Email"
          onChange={(e) => SetEmail(e.target.value)}
          type="email"
        ></input>
        <button>Send</button>
      </form>
    </>
  );
};

export default ResetPassword;
