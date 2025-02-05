import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
} from "@material-tailwind/react"
import ExpenseFrom from "./ExpensesFrom"
const ExpenseSerchandCreate = () => {
    return (
        <div className='flex mt-[80px] md:justify-between justify-center items-center '>
            <div className='ml-[40px]'>
                <Popover placement="md:right-start right">
                    <PopoverHandler>
                        <Button variant="filled" >Create Expense</Button>
                    </PopoverHandler>
                    <PopoverContent>
                        <ExpenseFrom />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default ExpenseSerchandCreate