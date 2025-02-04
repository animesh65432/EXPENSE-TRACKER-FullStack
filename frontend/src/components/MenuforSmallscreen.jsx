import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import PremiunBottom from "./premiunFeatures/PremuinBottom"
import { useState } from "react";
import ExpensesFrom from "./expenses/ExpensesFrom";

const MenuforSmallscreen = ({ navigatetoUpdateUser, isPremiumUser, Fechdata, handleLogout }) => {
    const [toggole, settoogle] = useState(false)

    const ontoggole = () => {
        settoogle((prev) => !prev)
    }

    return (
        <>
            <Menu>
                <MenuHandler>
                    <Button className=" text-black bg-transparent border-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </Button>
                </MenuHandler>
                <MenuList className="flex flex-col">
                    <MenuItem>
                        <Button variant="text" onClick={navigatetoUpdateUser} className="flex justify-center gap-4 items-center">
                            UpdateUser
                        </Button>
                    </MenuItem>
                    <MenuItem>
                        {isPremiumUser && (
                            <Button
                                onClick={Fechdata}
                                variant="text"
                                color="primary"
                                className="flex  justify-center items-center gap-2"
                            >
                                Upload Expense File


                            </Button>
                        )}

                    </MenuItem>
                    <MenuItem className="flex justify-center items-center text-black">
                        {isPremiumUser && <PremiunBottom />}


                    </MenuItem>
                    <MenuItem>
                        <Button variant="text" onClick={handleLogout} className="flex justify-center items-center">
                            log out

                        </Button>
                    </MenuItem>
                    <MenuItem>
                        <Button variant="text" className=" flex justify-center items-center" onClick={ontoggole}>Create Expense

                        </Button>
                    </MenuItem>
                </MenuList>
            </Menu>

            {toggole && <ExpensesFrom ontoggole={ontoggole} />}
        </>
    )
}

export default MenuforSmallscreen