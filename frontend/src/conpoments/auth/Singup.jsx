import { useState } from "react";
import usesingup from "../../hooks/usesingup.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

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
      <div className="signup-container">
        <form onSubmit={handleSubmithandler}>
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
          <button type="submit">
            {loading ? "loading" : "Create New User"}
          </button>
        </form>
        <Link to="/login">Log in</Link>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;