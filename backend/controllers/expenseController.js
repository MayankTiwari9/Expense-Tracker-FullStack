const Expense = require("../models/expense");

exports.addExpense = (req, res, next) => {
  const { amount, description, category } = req.body;

  Expense.create({
    amount,
    description,
    category
  })
  .then((expense) => {
    res.status(201).json({message: "Expense Created Successfully", expense})
  })
  .catch((err) => {
    console.log(err);
  })
};
