import { useState } from "react";
import usesingup from "../../hooks/usesingup.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import classes from "./singn.module.css";

const Signup = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { createtheuser, loading, error } = usesingup();

  const handleSubmithandler = async (e) => {
    e.preventDefault();
    if (
      userInput.name === "" ||
      userInput.email === "" ||
      userInput.password === ""
    ) {
      toast.error("Please Put Each And Everything");
      return;
    }

    const success = await createtheuser(userInput);
    if (!success) {
      toast.error(error);
    } else {
      toast.success("Sucessfully Created User");
    }
  };

  return (
    <>
      <div className={classes.container}>
        <form onSubmit={handleSubmithandler} className={classes.formGroup}>
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            value={userInput.name}
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
            value={userInput.email}
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
            value={userInput.password}
            onChange={(e) => {
              setUserInput((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
            type="password"
          />
          <button type="submit" className={classes.button}>
            {loading ? "loading" : "Create New User"}
          </button>
        </form>
        <div className={classes.footer}>
          <Link to="/login">Log in</Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
