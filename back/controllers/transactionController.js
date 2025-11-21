const Transaction = require("../models/Transaction");

// Получение всех транзакций пользователя
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
};

// Добавление транзакции
exports.addTransaction = async (req, res, next) => {
  try {
    const { type, amount, category, description } = req.body;
    const transaction = await Transaction.create({
      userId: req.userId,
      type,
      amount,
      category,
      description,
    });
    res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
};

// Удаление транзакции
exports.deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Transaction.findOneAndDelete({ _id: id, userId: req.userId });
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    next(err);
  }
};

// Редактирование транзакции по ID
exports.updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, amount, category, description } = req.body;

    // Находим и обновляем транзакцию, проверяя что она принадлежит пользователю
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { type, amount, category, description },
      { new: true, runValidators: true } // возвращаем обновленный документ и запускаем валидацию
    );

    // Если транзакция не найдена
    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(updatedTransaction);
  } catch (err) {
    next(err);
  }
};
