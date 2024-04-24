import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import uselogin from "../../hooks/uselogin.js";
import styles from "./Login.module.css";

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
      toast.error("Please Fill Each And Every Field");
    } else {
      let success = await logintheuser(userinput);

      if (!success) {
        toast.error(error);
      } else {
        toast.success("Successfully logged in");
      }
    }
  };

  const ResetPassword = () => {
    Navigate("/ResetPassword");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmithandler} className={styles.formGroup}>
        <div>
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            value={userinput.name}
            onChange={(e) =>
              setUserInput((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={userinput.email}
            onChange={(e) =>
              setUserInput((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={userinput.password}
            onChange={(e) =>
              setUserInput((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
          />
        </div>
        <button type="submit" className={styles.button}>
          {loading ? "Loading" : "Login"}
        </button>
      </form>
      <div className={styles.createAccount}>
        <Link to="/">Create New Account</Link>
      </div>
      <div className={styles.resetPassword}>
        <button onClick={ResetPassword}>Reset Password</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
