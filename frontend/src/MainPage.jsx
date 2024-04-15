import React from "react";
import Signup from "./conpoments/Singup";
import Login from "./conpoments/Login";
import { Route, Routes } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
};

export default MainPage;
