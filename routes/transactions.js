// const express = require('express');
// const router = express.Router();
// const transactionController = require('../controllers/transactionController');

// router.get('/', transactionController.getTransactions);
// router.post('/add', transactionController.addTransaction);
// router.post('/edit/:id', transactionController.editTransaction);
// router.get('/delete/:id', transactionController.deleteTransaction);

// module.exports = router;
// routes/transactions.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Route to display all transactions
router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.render('index', { transactions });
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
});

// Route to add a transaction
router.post('/add-transaction', async (req, res, next) => {
  try {
    const { type, category, amount, description, date } = req.body;
    const transaction = new Transaction({ type, category, amount, description, date });
    await transaction.save();
    res.redirect('/');
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
});

module.exports = router;
