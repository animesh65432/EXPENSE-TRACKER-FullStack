import React from "react";
import {
  Signup,
  Login,
  ResetPassword,
  ResetPassWordWithNewOne,
  Header,
  Leaderbord,
  UserDetails,
  Expenses
} from "./components";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Rootstate } from "@/stroe"
const MainPage: React.FC = () => {
  const isUserLoggedIn = useSelector((state: Rootstate) => state.user.value);
  const flagvalue = !!isUserLoggedIn;


  return (
    <div className="h-[100vh]  font-mono">
      {flagvalue ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Expenses />} />
            <Route path="/leaderborads" element={<Leaderbord />}></Route>
            <Route path="/userupdate" element={<UserDetails />}></Route>
            <Route path="*" element={<Expenses />}></Route>
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ResetPassWord" element={<ResetPassword />}></Route>
            <Route
              path="/resetpasswordwithnewone"
              element={<ResetPassWordWithNewOne />}
            ></Route>
            <Route path="*" element={<Login />}></Route>
          </Routes>
        </>
      )}
    </div>
  );
};

export default MainPage;
