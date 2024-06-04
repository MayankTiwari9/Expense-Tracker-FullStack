import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ExpenseForm = ({ fetchAllExpenses }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3001/purchase/user/status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsPremium(res.data.isPremium);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const expenseFormSubmitHandler = (e) => {
    e.preventDefault();

    const expenseData = {
      amount,
      description,
      category,
    };

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:3001/expense/addexpense", expenseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        fetchAllExpenses();
        setAmount("");
        setDescription("");
        setCategory("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const premiumMembershipHandler = async (e) => {
    e.preventDefault();
    
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay failed to load. Are you online?");
      return;
    }

    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:3001/purchase/premiumMembership",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    if (!response) {
      alert("Server error. Please try again later.");
      return;
    }

    const { id: order_id } = response.data.order;
    const options = {
      key: response.data.key_id,
      order_id: order_id,
      handler: async function (response) {
        const data = {
          order_id: order_id,
          payment_id: response.razorpay_payment_id,
        };

        await axios.post(
          "http://localhost:3001/purchase/updateTransactionStatus",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("You are now a premium user");
        setIsPremium(true);
      },
      prefill: {
        name: "Your Name",
        email: "email@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="flex min-h-full flex-1 flex-row justify-between px-6 py-12 lg:px-8">
      <div className="mt-10 sm:w-full sm:max-w-prose">
        <form
          onSubmit={expenseFormSubmitHandler}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Expense Amount
            </label>
            <div className="mt-2">
              <input
                id="amount"
                name="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                required
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Expense Description
            </label>
            <div className="mt-2">
              <input
                id="description"
                name="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
                required
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Expense Category
              </label>
            </div>
            <div className="mt-2">
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
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
      <div>
        {!isPremium ? (
          <button
            onClick={premiumMembershipHandler}
            type="button"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Buy Premium Membership
          </button>
        ) : (
          <p>You are a Premium User now</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseForm;
