import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import ExpenseFrom from "./ExpensesFrom"
import PremuinButton from "@/components/payment/PremuinButton"
import React from "react"
import { useSelector } from "react-redux"
import { Rootstate } from "@/stroe"
const ExpenseSerchandCreate: React.FC = () => {
    const ispremuinuser = useSelector((state: Rootstate) => state.userDetails.user?.ispremiumuser)
    return (
        <div className={`flex mt-[80px]  items-center p-4 w-full ${ispremuinuser ? "justify-center" : "justify-between"} `}>
            <div >
                <Popover >
                    <PopoverTrigger>
                        <Button className="bg-black hover:bg-slate-900">Create Expense</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <ExpenseFrom />
                    </PopoverContent>
                </Popover>
            </div>
            <div >
                {!ispremuinuser && <PremuinButton />}
            </div>
        </div>
    )
}

export default ExpenseSerchandCreate