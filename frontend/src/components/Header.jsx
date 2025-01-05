import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../assets/image";
import { deletethetokens } from "../stroe/slices";
import { useDispatch, useSelector } from "react-redux";
import { useGetthefile } from "../hooks";
import { Button } from "@material-tailwind/react";
import PremiunBottom from "./premiunFeatures/PremuinBottom";
import MenuforSmallscreen from "./MenuforSmallscreen";

const Header = () => {
  const dispatch = useDispatch();
  const isPremiumUser = useSelector((state) => state.user.ispremuinm);
  const [Fechdata] = useGetthefile();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(deletethetokens());
  };

  const navaigatetotheuserpage = () => {
    navigate("/user");
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-50">
      <nav className="w-full flex justify-between sm:h-[98px] h-[80px] p-6 text-slate-300 font-bold">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <div className="relative w-[70px] h-[40px]">
              <img src={Logo} alt="Logo" />
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <Button variant="text" onClick={navaigatetotheuserpage}>
            User
          </Button>

          {isPremiumUser && (
            <Button
              onClick={Fechdata}
              variant="text"
              color="primary"
            >
              Upload Expense File
            </Button>
          )}

          {isPremiumUser && <PremiunBottom />}

          <Button
            onClick={handleLogout}
            variant="text"
            color="secondary"
          >
            Log out
          </Button>
        </div>

        <div className="lg:hidden block">
          <MenuforSmallscreen
            handleLogout={handleLogout}
            navaigatetotheuserpage={navaigatetotheuserpage}
            isPremiumUser={isPremiumUser}
            Fechdata={Fechdata}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;