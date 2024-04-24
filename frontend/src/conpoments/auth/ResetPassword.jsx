import React, { useState } from "react";
import useResetPassword from "../../hooks/useResetPassword";
import styles from "./Restpassword.module.css";

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
    <div className={styles.container}>
      <form onSubmit={Onsubmithandler}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
