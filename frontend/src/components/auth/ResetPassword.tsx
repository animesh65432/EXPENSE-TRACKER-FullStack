import React, { useState } from "react";
import { useResetPassword } from "../../hooks";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button"

const ResetPassword: React.FC = () => {
  const [Email, SetEmail] = useState("");
  const [SentTheEmail] = useResetPassword();

  const Onsubmithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(Email);

    if (Email.length === 0) {
      return;
    } else {
      let result = await SentTheEmail({
        email: Email,
      });

      if (result) {
        toast.success("Please Check Your Email");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Look's like you Forget Something
        </h2>
        <form onSubmit={Onsubmithandler} className="space-y-4">
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
              onChange={(e) => SetEmail(e.target.value)}
              value={Email}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-center">
            <Button className="bg-black hover:bg-slate-400">Update</Button>
          </div>
        </form>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default ResetPassword;
