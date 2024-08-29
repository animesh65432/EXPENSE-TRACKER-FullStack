import { useState } from "react";
import { usesingup } from "../../hooks";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { expenstrackerwebsiteimages } from "../../utils";

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
      toast.error("Please fill out all fields");
      return;
    }

    const success = await createtheuser(userInput);
    if (!success) {
      toast.error(error);
    } else {
      toast.success("User created successfully");
    }
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
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="username"
                type="text"
                value={userInput.name}
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
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
                value={userInput.email}
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
                value={userInput.password}
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
                {loading ? "Loading..." : "Create New User"}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Signup;
