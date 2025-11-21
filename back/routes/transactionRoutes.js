const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { getTransactions, addTransaction, deleteTransaction, updateTransaction} = require('../controllers/transactionController');

const router = express.Router();

router.use(authenticate); // Все роуты ниже требуют авторизации

router.get('/', getTransactions);
router.post('/', addTransaction);
router.delete('/:id', deleteTransaction);
router.put('/:id', updateTransaction);

module.exports = router;