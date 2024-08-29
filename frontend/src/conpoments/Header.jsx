import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets/image";
import { deletethetokens } from "../stroe/slices";
import { useDispatch, useSelector } from "react-redux";
import { useGetthefile } from "../hooks";
import PremiunBottom from "./premiunFeatures/PremuinBottom";

const Header = () => {
  const dispatch = useDispatch();
  const isPremiumUser = useSelector((state) => state.user.ispremuinm);
  const [Fechdata] = useGetthefile();
  const handleLogout = () => {
    dispatch(deletethetokens());
  };

  return (
    <header className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/user">
            <button className="bg-white text-indigo-800 px-4 py-2 rounded-md hover:bg-indigo-700 hover:text-white transition">
              User
            </button>
          </Link>
          {isPremiumUser && (
            <button
              onClick={Fechdata}
              className="bg-white text-indigo-800 px-4 py-2 rounded-md hover:bg-indigo-100 transition duration-300"
            >
              Upload Expense File
            </button>
          )}
          {isPremiumUser && <PremiunBottom />}

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800 transition"
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
