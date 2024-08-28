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
  Footer,
} from "./conpoments";
import { Route, Routes, useNavigate } from "react-router-dom";
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
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ResetPassWord" element={<ResetPassword />}></Route>
            <Route
              path="/resetpassword/:id"
              element={<ResetPassWordWithNewOne />}
            ></Route>
          </Routes>
        </>
      )}
    </>
  );
};

export default MainPage;
