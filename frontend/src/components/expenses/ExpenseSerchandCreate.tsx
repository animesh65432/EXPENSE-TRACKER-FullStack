import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import ExpenseFrom from "./ExpensesFrom"
import React from "react"
const ExpenseSerchandCreate: React.FC = () => {
    return (
        <div className='flex mt-[80px] md:justify-between justify-center items-center '>
            <div className='ml-[40px]'>
                <Popover >
                    <PopoverTrigger>
                        <Button className="bg-black hover:bg-slate-900">Create Expense</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <ExpenseFrom />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default ExpenseSerchandCreate