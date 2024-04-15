import React from "react";
import Signup from "./conpoments/Singup";
import Login from "./conpoments/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import ExpensesFrom from "./conpoments/ExpensesFrom";
import { useSelector } from "react-redux";

const MainPage = () => {
  const isUserLoggedIn = useSelector((state) => state.user.value);
  const Naviagte = useNavigate();

  if (isUserLoggedIn) {
    Naviagte("/");
  }

  return (
    <>
      {isUserLoggedIn ? (
        <Routes>
          <Route path="/" element={<ExpensesFrom />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default MainPage;
