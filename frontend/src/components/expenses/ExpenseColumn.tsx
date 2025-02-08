import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { usedeleteExpense } from "@/hooks"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Updatexpense from "./Updatexpense"
import { useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"




type ExpenseTypes = {
    _id: string;
    Category: "dress" | "grocery" | "books" | "others";
    Expenseamount: number;
    ExpensesName: string;
    description: string;
    createdAt: string;
}

const ExpenseActions = ({ expense }: { expense: ExpenseTypes }) => {
    const { deletethexpenses } = usedeleteExpense();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const { toast } = useToast();

    const handleDelete = async () => {
        try {
            const result = await deletethexpenses(expense._id);
            if (result) {
                toast({
                    title: "Expense deleted successfully"
                });
            } else {
                toast({
                    title: "Something went wrong",
                    variant: "destructive",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
            toast({
                title: "Something went wrong",
                variant: "destructive",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem >
                    <Button
                        variant="ghost"
                        className="text-center"
                        onClick={() => handleDelete()}
                    >
                        Delete
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Popover open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            onClick={() => setIsEditOpen(true)}
                            className="text-center"
                        >
                            Edit
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <Updatexpense
                            expense={expense}
                            onSuccess={() => setIsEditOpen(false)}
                        />
                    </PopoverContent>
                </Popover>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const ExpensesColumn: ColumnDef<ExpenseTypes>[] = [
    {
        accessorKey: "Category",
        header: ({ column }) => {
            return <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 flex items-center gap-1 -ml-4">
                        CateGory
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => column.setFilterValue(undefined)}>
                        All
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.setFilterValue("dress")}>
                        Dress
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.setFilterValue("grocery")}>
                        Grocery
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.setFilterValue("books")}>
                        Books
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.setFilterValue("others")}>
                        Others
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        }
    }
    ,
    {
        accessorKey: "Expenseamount",
        header: "Amount",
        cell: ({ row, column }) => {
            const amount = parseFloat(row.getValue("Expenseamount"));
            console.log(typeof amount)
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return <>{formatted}</>;
        },
    },
    {
        accessorKey: "ExpensesName",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "About",
    },
    {
        id: "actions",
        cell: ({ row }) => <ExpenseActions expense={row.original} />,
    },
];