import React, { useState } from "react";
import useSetPassword from "../../hooks/useSetPassword";
import { useParams } from "react-router-dom";
import styles from "./ResetpasswordWithNewOne.module.css";

const ResetPassWordWithNewOne = () => {
  const [userInput, setUserInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [SetThePassWord] = useSetPassword();
  const { id } = useParams();

  const Onsubmithandler = (e) => {
    e.preventDefault();

    if (userInput.newPassword == "" && userInput.confirmPassword == "") {
      console.log("Please Fill both");
      return;
    }

    let res = SetThePassWord(
      { newPassword: userInput.newPassword, id: id },
      id
    );

    if (res) {
      console.log("Sucessfully changed ");
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={Onsubmithandler}>
          <label htmlFor="NewPassword" className={styles.label}>
            New Password
          </label>
          <input
            id="NewPassword"
            type="password"
            className={styles.input}
            placeholder="Please write new password here"
            value={userInput.newPassword}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
          />

          <label htmlFor="ConfirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            id="ConfirmPassword"
            type="password"
            className={styles.input}
            placeholder="Confirm password"
            value={userInput.confirmPassword}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />

          <button type="submit" className={styles.button}>
            Reset
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassWordWithNewOne;
