import React from "react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import LeaderBoradsBottom from "./premiunFeatures/LeaderBoradsBottom"
import { Button } from "@/components/ui/button"
import { Icons } from "@/Icon"

type Props = {
    navigateto: (Link: "/userupdate" | "/leaderborads") => void,
    isPremiumUser?: boolean,
    Fechdata: () => void,
    handleLogout: () => void
}

const MenuforSmallscreen: React.FC<Props> = ({ navigateto, isPremiumUser, Fechdata, handleLogout }) => {

    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <Button className=" text-black bg-transparent border-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <div className="flex flex-col mt-[3vh] gap-16">
                        <div className="flex items-center justify-center">
                            <Button onClick={() => navigateto("/userupdate")} variant="ghost">
                                UpdateUser
                            </Button>
                            <Icons.arrowRight />
                        </div>

                        {isPremiumUser && (
                            <div className="flex items-center justify-center">
                                <Button
                                    onClick={Fechdata}
                                    color="primary"
                                    className="flex  justify-center items-center gap-2"
                                    variant="ghost"
                                >
                                    Upload Expense File


                                </Button>
                                <Icons.arrowRight />
                            </div>
                        )}

                        {isPremiumUser &&
                            <div className="flex items-center justify-center"><LeaderBoradsBottom />
                                <Icons.arrowRight /></div>}

                        <div className="flex items-center justify-center">
                            <Button onClick={handleLogout} variant="ghost">
                                log out

                            </Button>
                            <Icons.arrowRight />
                        </div>

                    </div>

                </SheetContent>
            </Sheet >
        </>
    )
}

export default MenuforSmallscreen