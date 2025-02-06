import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../assets/image";
import { deletethetokens } from "../stroe/slices";
import { removeuser } from "../stroe/slices/user"
import { useDispatch, useSelector } from "react-redux";
import { useGetthefile } from "../hooks";
import MenuforSmallscreen from "./MenuforSmallscreen";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Rootstate } from "@/stroe"
const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isPremiumUser = useSelector((state: Rootstate) => state.user.ispremuinm);
  const user = useSelector((state: Rootstate) => state.userDetails.user)
  const [Fechdata] = useGetthefile();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(deletethetokens());
    dispatch(removeuser())
  };
  const navigatetoUpdateUser = () => {
    navigate("/userupdate")
  }

  console.log(`Currentuser ${user?.name}`)

  return (
    <header className="sticky top-0 z-50 bg-gray-200 w-full h-[10vh] font-mono">
      <nav className="w-full flex justify-between  h-[10vh] p-6 text-slate-300 font-bold items-center">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <div className="relative w-[70px] h-[40px]">
              <img src={Logo} alt="Logo" />
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-4">

          <Popover >
            <PopoverTrigger>
              <div>{user?.image ?
                <img src={user?.image} alt="User Profile" className="h-[7vh] w-[7vw] rounded-lg" /> : <>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkr94Z9oGA_KuzX9ghnsctIEudavAJJht_VUyCDUw6c8eBeijX1Hg1RA6ckmWhBVNUlx4&usqp=CAU" className="w-10 h-10 rounded-lg" /></>
              }</div>
            </PopoverTrigger>
            <PopoverContent>
              <Card className="flex flex-col gap-4 p-5 font-semibold">
                <div>{user?.name}</div>
                <div className="flex gap-3">
                  <Button onClick={handleLogout} className="bg-black hover:bg-slate-600">logout</Button>
                  <Button onClick={navigatetoUpdateUser} className="bg-black hover:bg-slate-600">Update</Button>
                </div>
              </Card>
            </PopoverContent>
          </Popover>


        </div>

        <div className="lg:hidden block">
          <MenuforSmallscreen
            handleLogout={handleLogout}
            navigatetoUpdateUser={navigatetoUpdateUser}
            isPremiumUser={isPremiumUser}
            Fechdata={Fechdata}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;