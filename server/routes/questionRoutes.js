const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');


/**
 * Question routes
 */

router.get('/Question/question',questionController.question);
router.get('/Question/submit-question', questionController.submitQuestion);
router.post('/Question/submit-question', questionController.submitQuestionOnPost);
router.get('/Question/update-question/:id', questionController.updateQuestion);
router.get('/Question/delete-question/:id', questionController.deleteQuestion);
router.post('/update-questionrecord/:id', questionController.updateQuestionRecord);

module.exports = router; //export router