import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import PremiunBottom from "./premiunFeatures/PremuinBottom"

const MenuforSmallscreen = ({ navaigatetotheuserpage, isPremiumUser, Fechdata, handleLogout }) => {
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
                <MenuList>
                    <MenuItem>
                        <Button variant="text" onClick={navaigatetotheuserpage} className="flex justify-center gap-4 items-center">
                            User
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>


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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>


                            </Button>
                        )}

                    </MenuItem>
                    <MenuItem className="flex justify-center items-center text-black">
                        {isPremiumUser && <PremiunBottom />}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>

                    </MenuItem>
                    <MenuItem>
                        <Button variant="text" onClick={handleLogout} className="flex justify-center items-center">
                            log out
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>

                        </Button>
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}

export default MenuforSmallscreen