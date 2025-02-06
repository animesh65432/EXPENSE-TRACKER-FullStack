import React, { useState } from "react";
import { usesingup } from "../../hooks";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { expenstrackerwebsiteimages } from "../../utils";
import { Button } from "@/components/ui/button"
import { Icons } from "@/Icon"
const Signup: React.FC = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { createtheuser, loading, error } = usesingup();

  const handleSubmithandler = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen p-4 bg-gray-50">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={expenstrackerwebsiteimages}
            alt="Expense Tracker"
            className="h-44 w-auto mt-8 md:mt-0"
          />
        </div>
        <div className="w-full lg:w-1/2 mt-8 md:mt-0 p-4 bg-white shadow-lg rounded-lg">
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
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-[200px] flex justify-center py-2 px-4 bg-black hover:bg-slate-600"
              >
                {loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Create New User"}

              </Button>
            </div>
          </form>
          <div className="mt-6 text-center font-bold">
            <Link
              to="/login"
              className="text-slate-600 hover:text-slate-700 text-sm"
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
