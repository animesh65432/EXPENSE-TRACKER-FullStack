import React, { useState } from "react";
import { useSetPassword } from "../../hooks";
import { useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
const ResetPassWordWithNewOne = () => {
  const [userInput, setUserInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [SetThePassWord] = useSetPassword();
  const { id } = useParams();

  const Onsubmithandler = (e) => {
    e.preventDefault();

    if (userInput.newPassword === "" && userInput.confirmPassword === "") {
      toast.error("Please Fill both");
      return;
    } else if (userInput.newPassword !== userInput.confirmPassword) {
      toast.error("Password and confirm password is not same");
    }

    let res = SetThePassWord(
      { newPassword: userInput.newPassword, id: id },
      id
    );

    if (res) {
      toast.success("Successfully changed");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Reset Password
          </h2>
          <form onSubmit={Onsubmithandler} className="space-y-4">
            <div>
              <label
                htmlFor="NewPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="NewPassword"
                type="password"
                placeholder="Please write new password here"
                value={userInput.newPassword}
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="ConfirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="ConfirmPassword"
                type="password"
                placeholder="Confirm password"
                value={userInput.confirmPassword}
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default ResetPassWordWithNewOne;
