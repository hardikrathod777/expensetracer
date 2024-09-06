const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactions');

const app = express();

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

app.use('/', transactionRoutes);

app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
