import axios from "axios";
import React, { useState } from "react";

const ExpenseForm = () => {
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const expenseFormSubmitHandler = (e) => {
    e.preventDefault();

    const expenseData = {
      amount,
      description,
      category,
    }

    axios
      .post("http://localhost:3001/expense/addexpense", expenseData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });  
  };

  return (
    <div>
      <form onSubmit={expenseFormSubmitHandler}>
        <div>
          <label>Expense Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
        <div>
          <label>Expense Description</label>
          <input
            type="text"
            name="description"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
        <div>
          <label>Expense Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-1/4 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          >
            <option value="">Select a category</option>
            <option value="Fuel">Fuel</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
          </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
