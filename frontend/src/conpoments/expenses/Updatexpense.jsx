import React, { useState } from "react";
import useupdateexpense from "../../hooks/useupdateexpense";

const Updatexpense = ({ obj }) => {
  const [userinput, setuserinput] = useState({
    ExpensesName: obj.ExpensesName,
    description: obj.description,
    Category: obj.Category,
    Expenseamount: obj.Expenseamount,
  });

  const [loading, UpdateTheExpensefun] = useupdateexpense();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await UpdateTheExpensefun({
        ...userinput,
        id: obj.id,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <label htmlFor="expensename">ExpenseName :</label>
        <input
          type="text"
          id="expensename"
          value={userinput.ExpensesName}
          onChange={(e) =>
            setuserinput((prev) => {
              return { ...prev, ExpensesName: e.target.value };
            })
          }
        ></input>
        <label htmlFor="description">DesCription :</label>
        <input
          type="text"
          id="description"
          value={userinput.description}
          onChange={(e) =>
            setuserinput((prev) => {
              return { ...prev, Decription: e.target.value };
            })
          }
        ></input>
        <label htmlFor="category">CateGory :</label>
        <input
          type="text"
          id="category"
          value={userinput.Category}
          onChange={(e) =>
            setuserinput((prev) => {
              return { ...prev, Category: e.target.value };
            })
          }
        ></input>
        <label htmlFor="amount">Amount :</label>
        <input
          type="text"
          id="amount"
          value={userinput.Expenseamount}
          onChange={(e) =>
            setuserinput((prev) => {
              return { ...prev, Expenseamount: e.target.value };
            })
          }
        ></input>

        <button type="submit">{loading ? "loading" : "Update"}</button>
      </form>
    </div>
  );
};

export default Updatexpense;
