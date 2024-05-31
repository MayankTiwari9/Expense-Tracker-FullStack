const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expenseController");
const userAuthenticate = require('../auth/authenticate');

router.post("/addexpense", expenseController.addExpense);
router.get("/allexpenses", userAuthenticate, expenseController.getAllExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
