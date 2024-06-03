import axios from "axios";
import React, { useEffect, useState } from "react";
import ExpenseForm from "../ExpenseForm/ExpenseForm";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchAllExpenses = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:3001/expense/allexpenses",
        { headers: { Authorization: `Bearer ${token}` } } // Add "Bearer" before the token
      );
      const data = response.data;
      setExpenses(data.expenses);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpense = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3001/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAllExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  return (
    <>
      <ExpenseForm fetchAllExpenses={fetchAllExpenses} />
      <ul role="list" className="divide-y divide-gray-100 p-6">
        {expenses.map((expense) => (
          <li key={expense.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {expense.amount}
                </p>
              </div>
            </div>
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {expense.description}
                </p>
              </div>
            </div>
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {expense.category}
                </p>
              </div>
            </div>
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <button className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">
                  Edit Expense
                </button>
              </div>
            </div>
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Delete Expense
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ExpenseList;
