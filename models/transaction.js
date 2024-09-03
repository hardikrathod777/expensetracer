const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    type: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
