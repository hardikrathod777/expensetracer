const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');


router.get('/', transactionController.getTransactions);
router.get('/add', transactionController.getAddTransactionForm);
router.post('/add', transactionController.addTransaction);
router.get('/edit/:id', transactionController.getEditTransactionForm);
router.post('/edit/:id', transactionController.updateTransaction);
router.post('/delete/:id', transactionController.deleteTransaction);


module.exports = router;
