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

exports.getAddTransactionForm = (req, res, next) => {
    try {
      res.render('addTransaction'); // Ensure 'addTransaction' matches the EJS file name
    } catch (error) {
      next(error); // Passes any errors to the error-handling middleware
    }
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

// Edit a transaction
exports.editTransaction = async (req, res) => {
    try {
        let transaction = await Transaction.findById(req.params.id);

        if (!transaction) return res.status(404).send('Transaction not found');

        const { type, category, amount, description, date } = req.body;

        transaction.type = type;
        transaction.category = category;
        transaction.amount = amount;
        transaction.description = description;
        transaction.date = date;

        await transaction.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    try {
        let transaction = await Transaction.findById(req.params.id);

        if (!transaction) return res.status(404).send('Transaction not found');

        await Transaction.findByIdAndRemove(req.params.id);

        res.redirect('/');
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
