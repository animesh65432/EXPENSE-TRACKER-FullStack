import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Button = () => {
  const idtoken = useSelector((state) => state.user.value);
  const OnClick = async () => {
    let res = await axios.get(
      `http://localhost:3000/paymentFeatures/ShowTheLeadersboard`,
      {
        headers: {
          idtoken: idtoken,
        },
      }
    );

    console.log(res);
  };
  return (
    <>
      <button onClick={OnClick}>Click Me</button>
    </>
  );
};

export default Button;
