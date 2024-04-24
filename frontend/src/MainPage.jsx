import React, { useEffect } from "react";
import Signup from "./conpoments/auth/Singup";
import Login from "./conpoments/auth/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import ExpensesFrom from "./conpoments/expenses/ExpensesFrom";
import { useSelector } from "react-redux";
import ResetPassword from "./conpoments/auth/ResetPassword";
import ResetPassWordWithNewOne from "./conpoments/auth/ResetPassWordWithNewOne";
import Header from "./conpoments/Header";
import Leaderbord from "./conpoments/premiunFeatures/Leaderbord";
import UserDetails from "./conpoments/users/UserDeatils";
import useGettheuser from "./hooks/useGettheuser";

const MainPage = () => {
  const isUserLoggedIn = useSelector((state) => state.user.value);
  const flagvalue = !!isUserLoggedIn;
  const [GetTheCurrentUser] = useGettheuser();
  useEffect(() => {
    GetTheCurrentUser();
  }, []);

  return (
    <>
      {flagvalue ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<ExpensesFrom />} />
            <Route path="/leaderborads" element={<Leaderbord />}></Route>
            <Route path="/user" element={<UserDetails />}></Route>
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ResetPassWord" element={<ResetPassword />}></Route>
          <Route
            path="/resetpassword/:id"
            element={<ResetPassWordWithNewOne />}
          ></Route>
        </Routes>
      )}
    </>
  );
};

export default MainPage;
