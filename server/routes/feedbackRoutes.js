const express = require('express');
const router = express.Router();
const feedBackController = require('../controllers/feedBackController');


/**
 * App routes
 */

router.get('/FeedBack/feedback', feedBackController.exploreFeedBack);
router.get('/FeedBack/delete-feedback/:id', feedBackController.deleteFeedBack);
router.get('/FeedBack/submit-feedback', feedBackController.submitFeedBack);
router.post('/FeedBack/submit-feedback', feedBackController.submitFeedBackOnPost);
router.get('/FeedBack/update-feedback/:id', feedBackController.updateFeedBack);
router.post('/update-feedbackrecord/:id', feedBackController.updateFeedBackRecord);
router.post('/FeedBack/searchFeedBack', feedBackController.searchFeedBack);

module.exports = router; //export router