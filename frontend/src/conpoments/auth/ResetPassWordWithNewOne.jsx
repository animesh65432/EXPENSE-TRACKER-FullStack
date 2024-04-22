import React, { useState } from "react";
import useSetPassword from "../../hooks/useSetPassword";
import { useParams } from "react-router-dom";

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
      <form onSubmit={Onsubmithandler}>
        <label htmlFor="NewPassWord">NewPassWord</label>
        <input
          id="NewPassWord"
          placeholder="Please Write New Password here"
          onChange={(e) =>
            setUserInput((prev) => {
              return { ...prev, newPassword: e.target.value };
            })
          }
        ></input>

        <label htmlFor="ConfirmPassWrod">
          <input
            id="ConfirmPassWrod"
            placeholder="ConfirmPassWord"
            onChange={(e) => {
              setUserInput((prev) => {
                return { ...prev, confirmPassword: e.target.value };
              });
            }}
          ></input>
        </label>

        <button type="submit">Reset</button>
      </form>
    </>
  );
};

export default ResetPassWordWithNewOne;
