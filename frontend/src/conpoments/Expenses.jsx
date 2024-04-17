import useGetExpense from "../hooks/useGetExpense";
import ExpensesItem from "./ExpensesItem";
import { useSelector } from "react-redux";
import Button from "./Button";

const Expenses = () => {
  const ispremuinm = useSelector((state) => state.user.ispremuinm);
  console.log(false);
  const [expenses, loading] = useGetExpense();
  console.log(expenses);

  if (loading) {
    return (
      <div className="loading-message">
        <p>Loading...</p>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="no-expenses-message">
        <p>No expenses have been added</p>
      </div>
    );
  }

  return (
    <>
      <div className="expenses-container">
        {expenses.map((obj) => (
          <div className="expenses-item" key={obj.id}>
            <ExpensesItem obj={obj} />
          </div>
        ))}
      </div>

      {ispremuinm && <Button />}
    </>
  );
};

export default Expenses;
