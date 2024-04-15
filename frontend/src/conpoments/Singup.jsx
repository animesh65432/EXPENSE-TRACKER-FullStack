import { useState } from "react";
import "./singup.css";

const Signup = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
  });

  const handleSubmithandler = (e) => {
    e.preventDefault();
    console.log(userInput);
  };

  return (
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
