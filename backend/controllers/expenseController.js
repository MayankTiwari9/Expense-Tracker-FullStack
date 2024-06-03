const Expense = require("../models/expense");

exports.addExpense = (req, res, next) => {
  const { amount, description, category } = req.body;
  const userId = req.user.id; // Get the userId from the request object

  Expense.create({
    amount,
    description,
    category,
    userId, // Set the userId
  })
    .then((expense) => {
      res.status(201).json({ message: "Expense Created Successfully", expense });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to create expense", error: err.message });
    });
};

exports.getAllExpense = (req, res, next) => {
  Expense.findAll({where: {userId: req.user.id}})
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
