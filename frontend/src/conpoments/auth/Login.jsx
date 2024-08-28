import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { uselogin } from "../../hooks";
import { expenstrackerwebsiteimages } from "../../utils";

const Login = () => {
  const [userinput, setUserInput] = useState({
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
    <>
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-4">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={expenstrackerwebsiteimages}
            alt="Expense Tracker"
            className="h-44 w-auto mt-8 md:mt-0"
          />
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 p-4 bg-white shadow-lg rounded-lg">
          <form onSubmit={handleSubmithandler} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={userinput.email}
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={userinput.password}
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Loading..." : "log in"}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center space-y-2">
            <div>
              <Link
                to="/"
                className="text-indigo-600 hover:text-indigo-500 text-sm"
              >
                Don't have an account? Create New
              </Link>
            </div>
            <div>
              <Link
                to="/resetpassword"
                className="text-indigo-600 hover:text-indigo-500 text-sm"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
