const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expenseController');

router.post('/expense/addexpense', expenseController.addExpense);

module.exports = router;