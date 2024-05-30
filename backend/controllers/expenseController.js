const Expense = require("../models/expense");

exports.addExpense = (req, res, next) => {
  const { amount, description, category } = req.body;

  Expense.create({
    amount,
    description,
    category,
  })
    .then((expense) => {
      res
        .status(201)
        .json({ message: "Expense Created Successfully", expense });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllExpense = (req, res, next) => {
  Expense.findAll()
    .then((expenses) => {
      res.status(200).json({ expenses });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteExpense = (req, res, next) => {
  const { id } = req.params;

  Expense.destroy({ where: { id: id } })
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({ message: "Expense Deleted Successfully" });
      } else {
        res.status(404).json({ message: "Expense Not Found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "An error occurred", error: err });
    });
};
