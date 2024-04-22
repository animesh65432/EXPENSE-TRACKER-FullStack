import useGetExpense from "../../hooks/useGetExpense";
import ExpensesItem from "./ExpensesItem";
import { useSelector } from "react-redux";

const Expenses = () => {
  const ispremuinuser = useSelector((state) => state.user.ispremuinm);
  const [expenses, loading] = useGetExpense();
  console.log(ispremuinuser);

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
    </>
  );
};

export default Expenses;
