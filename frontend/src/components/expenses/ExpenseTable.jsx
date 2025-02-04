import React, { useState } from 'react'
import { Card, Typography, Button, Spinner } from "@material-tailwind/react"
import { usedeleteExpense } from "../../hooks"
import { Updatexpense } from "../expenses"
import { toast, Toaster } from "react-hot-toast"


const ExpenseTable = ({ expenses }) => {
    const [loading, deletethexpenses] = usedeleteExpense()
    const [toggole, settoogle] = useState(false)

    const onClickdelete = async (id) => {
        try {
            console.log(id)
            await deletethexpenses(id)
            toast.success("Successfully deleted")
        } catch (error) {
            console.log(error, "errors in delete expense table")
            toast.error("Please try again")
        }
    }



    const ontoggole = () => {
        settoogle((prev) => !prev)
    }
    return (
        <>
            <Card >
                <div className="overflow-x-auto">
                    <table >
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="p-3  text-left">Name</th>
                                <th className="p-3  text-left">Amount</th>
                                <th className="p-3  text-left">Category</th>
                                <th className="p-3 text-left">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense, index) => (
                                <tr
                                    key={expense?._id}
                                    className={`hover:bg-gray-50 ${index !== expenses.length - 1 ? 'border-b border-gray-200' : ''
                                        }`}
                                >
                                    <td className="p-3 ">
                                        <Typography className="font-medium">
                                            {expense?.ExpensesName}
                                        </Typography>
                                    </td>
                                    <td className="p-3">
                                        <Typography>
                                            ${Number(expense?.Expenseamount).toLocaleString()}
                                        </Typography>
                                    </td>
                                    <td className="p-3">
                                        <Typography>
                                            {expense?.Category}
                                        </Typography>
                                    </td>
                                    <td className="p-3">
                                        <Typography className="truncate max-w-xs">
                                            {expense?.description}
                                        </Typography>
                                    </td>
                                    <td className='p-3'>
                                        <Button variant="text" onClick={() => onClickdelete(expense._id)}>
                                            {loading ? <Spinner /> : "Delete"}
                                        </Button>
                                    </td>
                                    <td className='p-3'>
                                        <Button variant="text" onClick={ontoggole} >edit</Button>
                                        {toggole && <Updatexpense expense={expense} ontoggole={ontoggole} />}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </Card>

            <Toaster />

        </>
    )
}

export default ExpenseTable