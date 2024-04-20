import React from "react";
import axios from "axios";
const useSetPassword = () => {
  const SetThePassWord = async (obj) => {
    try {
      await axios.put(`http://localhost:3000/Resest/updatePasswords`, obj);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return [SetThePassWord];
};

export default useSetPassword;
