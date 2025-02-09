import { ExpenseTypes } from "@/stroe/slices/expense"

export function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// "https://expense-tracker-full-stack-jsqa.vercel.app";

export const backendurl = "https://savewave-backend.onrender.com";
export const STRIPEPUBLISHKEY =
  "pk_test_51Psqi7JhBtJKyrO1Zrk7Uqzm09yw2dbHDJ5X3ANmtNuSnxwfwKaVu7tAEH5lp9OlWweGajBUsLkQ5qzcqBViqiFj0015Jw3xzG";

export const expenstrackerwebsiteimages =
  "https://repository-images.githubusercontent.com/419507496/cfcc1354-86ac-432e-823a-da56c21302ba";


export const groupTheExpense = (data: ExpenseTypes[]) => {
  const groupedExpenses = data.reduce((acc, expense) => {
    const category = expense.Category.toLowerCase(); // Normalize category name to lowercase

    if (acc[category]) {
      acc[category] += expense.Expenseamount;
    } else {
      acc[category] = expense.Expenseamount;
    }

    return acc;
  }, {} as { [key: string]: number });

  const result = Object.keys(groupedExpenses).map((category) => ({
    Category: category,
    Expenseamount: groupedExpenses[category],
    fill: `var(--color-${category})`,
  }));

  return result;
};

