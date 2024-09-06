const transaction = require('../models/transaction');
const Transaction = require('../models/transaction');

// Get all transactions
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.render('index', { transactions });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getAddTransactionForm = (req, res) => {
  res.render('addTransaction'); // Add Transaction page
};

// Handle adding a new transaction
exports.addTransaction = async (req, res, next) => {
  try {
    const { type, category, amount, description, date } = req.body;
    const transaction = new Transaction({ type, category, amount, description, date });
    await transaction.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

// Display the form to edit an existing transaction
exports.getEditTransactionForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).send('Transaction not found');
    }
    res.render('editTransaction', { transaction }); // Pass transaction data to the view
  } catch (error) {
    next(error);
  }
};

// Handle editing an existing transaction
exports.updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, category, amount, description, date } = req.body;
    await Transaction.findByIdAndUpdate(id, { type, category, amount, description, date });
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

// Handle deleting a transaction
exports.deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.redirect('/');  // Redirect to the homepage or the transactions list after deleting
  } catch (error) {
    next(error);
  }
};
