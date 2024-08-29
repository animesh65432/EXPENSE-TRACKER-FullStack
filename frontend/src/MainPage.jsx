import React, { useEffect } from "react";
import {
  Signup,
  Login,
  ExpensesFrom,
  ResetPassword,
  ResetPassWordWithNewOne,
  Header,
  Leaderbord,
  UserDetails,
} from "./conpoments";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import useGettheuser from "./hooks/useGettheuser";

const MainPage = () => {
  const isUserLoggedIn = useSelector((state) => state.user.value);
  const flagvalue = !!isUserLoggedIn;
  const [GetTheCurrentUser] = useGettheuser();
  useEffect(() => {
    if (flagvalue) {
      GetTheCurrentUser();
    }
  }, [flagvalue]);

  return (
    <>
      {flagvalue ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<ExpensesFrom />} />
            <Route path="/leaderborads" element={<Leaderbord />}></Route>
            <Route path="/user" element={<UserDetails />}></Route>
            <Route path="*" element={<ExpensesFrom />}></Route>
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
    </>
  );
};

export default MainPage;
