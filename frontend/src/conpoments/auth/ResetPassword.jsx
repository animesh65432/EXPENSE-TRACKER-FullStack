import React, { useState } from "react";
import useResetPassword from "../../hooks/useResetPassword";
import styles from "./Restpassword.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [Email, SetEmail] = useState("");
  const [SentTheEmail] = useResetPassword();
  const Onsubmithandler = (e) => {
    e.preventDefault();
    console.log(Email);

    if (Email.length == 0) {
      return;
    } else {
      let result = SentTheEmail({
        email: Email,
      });

      if (result) {
        toast.success("Please Check Your Email");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={Onsubmithandler}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          className={styles.input}
          onChange={(e) => SetEmail(e.target.value)}
          value={Email}
        />
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
