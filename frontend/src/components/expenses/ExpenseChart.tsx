import { Pie, PieChart, Label } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


type Group_ExpenseTypes = {
    Category: string,
    Expenseamount: number,
    fill: string
}



const chartConfig = {
    books: {
        label: "Books",
        color: "hsl(var(--chart-1))"
    },
    grocery: {
        label: "Grocery",
        color: "hsl(var(--chart-2))"
    },
    dress: {
        label: "Dress",
        color: "hsl(var(--chart-3))"
    },
    others: {
        label: "Others",
        color: "hsl(var(--chart-4))"
    }

} satisfies ChartConfig

type Props = {
    Group_Expense: Group_ExpenseTypes[]
}

const ExpenseChart: React.FC<Props> = ({ Group_Expense }) => {
    const Total_expense = Group_Expense.reduce((acc, cur) => acc + cur.Expenseamount, 0);
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Expense Chart</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={Group_Expense} dataKey="Expenseamount" nameKey="Category" innerRadius={60} strokeWidth={5} >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan x={viewBox.cx} y={viewBox.cy} fontSize="18" fontWeight="bold" fill="black">
                                                    Expenses
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} fontSize="16" fill="gray">
                                                    ₹{Total_expense}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />

                        </Pie>
                    </PieChart>

                </ChartContainer>
            </CardContent>
        </Card >
    )
}

export default ExpenseChart
