const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expenseController");

router.post("/addexpense", expenseController.addExpense);
router.get("/allexpenses", expenseController.getAllExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
