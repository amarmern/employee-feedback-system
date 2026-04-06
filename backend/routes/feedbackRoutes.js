const router = require('express').Router();
const {
  submitFeedback,
  getFeedbackForEmployee,
  getAverageRating,
  deleteFeedback,
} = require('../controllers/feedbackController');

router.post('/', submitFeedback);
router.get('/avg/:id', getAverageRating);
router.get('/:id', getFeedbackForEmployee);

router.delete('/:id', deleteFeedback);

module.exports = router;
