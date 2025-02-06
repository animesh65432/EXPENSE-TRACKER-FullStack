import React from 'react'
import { usedeleteExpense } from "../../hooks"
import { Updatexpense } from "../expenses"
import { toast, Toaster } from "react-hot-toast"

type Expensestypes = {
    _id: string,
    Category: string,
    Expenseamount: number,
    ExpensesName: string,
    createdAt: string
}

type Props = { expenses: Expensestypes[] }


const ExpenseTable: React.FC<Props> = ({ expenses }) => {
    const [loading, deletethexpenses] = usedeleteExpense()
    const onClickdelete = async (id: string) => {
        try {
            console.log(id)
            await deletethexpenses(id)
            toast.success("Successfully deleted")
        } catch (error) {
            console.log(error, "errors in delete expense table")
            toast.error("Please try again")
        }
    }


    return (
        <>

            <Toaster />

        </>
    )
}

export default ExpenseTable