import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { uselogin } from "../../hooks";
import { expenstrackerwebsiteimages } from "../../utils";
import { Button, Spinner } from "@material-tailwind/react"

const Login = () => {
  const [userinput, setUserInput] = useState({
    email: "test@gmail.com",
    password: "testpasword",
  });
  const { logintheuser, loading, error } = uselogin();

  const handleSubmithandler = async (e) => {
    e.preventDefault();
    if (
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

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen p-4 bg-gray-50">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={expenstrackerwebsiteimages}
            alt="Expense Tracker"
            className="h-44 w-auto mt-8 lg:mt-0"
          />
        </div>
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 p-4 bg-white shadow-lg rounded-lg">
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
            <div className="flex justify-center">
              <Button
                variant="outlined"
                type="submit"
                className="w-[200px]"
              >
                {loading ? <Spinner /> : "log in"}
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center space-y-2 font-bold">
            <div>
              <Link
                to="/"
                className="text-slate-600 hover:text-slate-700 text-sm"
              >
                Don't have an account? Create New
              </Link>
            </div>
            <div>
              <Link
                to="/resetpassword"
                className="text-slate-600 hover:text-slate-700 text-sm"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />


    </>
  );
};

export default Login;
