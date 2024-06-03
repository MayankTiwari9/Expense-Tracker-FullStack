const express = require('express');
const expenseController = require('../controllers/expenseController');
const authenticate = require('../auth/authenticate');

const router = express.Router();

router.post('/addexpense', authenticate, expenseController.addExpense);
router.get('/allexpenses', authenticate, expenseController.getAllExpense);
router.delete('/deleteexpense/:id', authenticate, expenseController.deleteExpense);

module.exports = router;
