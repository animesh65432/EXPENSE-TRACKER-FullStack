import React from "react";
import Signup from "./conpoments/Singup";
import Login from "./conpoments/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import ExpensesFrom from "./conpoments/ExpensesFrom";
import { useSelector } from "react-redux";
import ResetPassword from "./conpoments/ResetPassword";
import ResetPassWordWithNewOne from "./conpoments/ResetPassWordWithNewOne";

const MainPage = () => {
  const isUserLoggedIn = useSelector((state) => state.user.value);
  const flagvalue = !!isUserLoggedIn;
  const Naviagte = useNavigate();

  if (flagvalue) {
    Naviagte("/");
  }

  return (
    <>
      {flagvalue ? (
        <Routes>
          <Route path="/" element={<ExpensesFrom />} />
        </Routes>
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
