import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import uselogin from "../../hooks/uselogin.js";

const Login = () => {
  const [userinput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { logintheuser, loading, error } = uselogin();
  const Navigate = useNavigate();
  const handleSubmithandler = async (e) => {
    e.preventDefault();
    if (
      userinput.name === "" ||
      userinput.email === "" ||
      userinput.password === ""
    ) {
      toast.error("Please Fill Each And Every Filed");
    } else {
      let success = await logintheuser(userinput);

      if (!success) {
        toast.error(error);
      } else {
        toast.success("Sucessfully login");
      }
    }
  };

  const ResetPassword = () => {
    Navigate("/ResetPassWord");
  };

  return (
    <>
      <div className="signup-container">
        <form onSubmit={handleSubmithandler}>
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            value={userinput.name}
            onChange={(e) => {
              setUserInput((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
          <br />
          <br />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={userinput.email}
            onChange={(e) => {
              setUserInput((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
          />
          <br />
          <br />
          <label htmlFor="password">PassWord</label>
          <input
            id="password"
            value={userinput.password}
            onChange={(e) => {
              setUserInput((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
            type="password"
          />
          <button type="submit">{loading ? "loading" : "login"}</button>
        </form>
        <Link to="/">
          <p>Create New Account</p>
        </Link>
      </div>

      <button onClick={ResetPassword}>ResetPasssword</button>
      <ToastContainer />
    </>
  );
};

export default Login;