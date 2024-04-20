import axios from "axios";

const useResetPassword = () => {
  const SentTheEmail = async (obj) => {
    try {
      let response = await axios.post(
        "http://localhost:3000/Resest/forgetpassword",
        obj
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return [SentTheEmail];
};

export default useResetPassword;
