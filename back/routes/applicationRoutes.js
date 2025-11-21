const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
  submitApplication
} = require('../controllers/applicationController');

const router = express.Router();

router.use(authenticate); // Все роуты ниже требуют авторизации

router.get('/', getApplications);
router.get('/:id', getApplicationById);
router.post('/', createApplication);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);
router.patch('/:id/submit', submitApplication); // Отправка черновика на проверку

module.exports = router;