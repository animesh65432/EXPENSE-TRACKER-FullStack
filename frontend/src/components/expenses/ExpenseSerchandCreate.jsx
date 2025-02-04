import { useState } from 'react'
import { Button } from "@material-tailwind/react"
import ExpenseFrom from "./ExpensesFrom"
import { Typography } from "@material-tailwind/react"

const ExpenseSerchandCreate = () => {
    const [toggole, settoogle] = useState(false)

    const ontoggole = () => {
        settoogle((prev) => !prev)
    }
    return (
        <div className='flex mt-[80px] md:justify-between justify-center items-center md:ml-32 md:mr-3'>
            <div className='lg:block hidden'>
                <Button variant="filled" onClick={ontoggole}>Create Expense</Button>
            </div>
            {toggole && <ExpenseFrom ontoggole={ontoggole} />}
        </div>
    )
}

export default ExpenseSerchandCreate