const express = require('express');
const router = express.Router();
const feedBackController = require('../controllers/feedBackController');


/**
 * App routes
 */

// router.get('/categories', feedBackController.exploreCategories);
// router.get('/news/:id', feedBackController.exploreNews);
// router.get('/categories/:id', feedBackController.exploreCategoriesbyId);
// router.post('/search', feedBackController.searchNews);
// router.get('/explore-latest', feedBackController.exploreLatest);
// router.get('/explore-random', feedBackController.exploreRandom);
router.get('/FeedBack/submit-feedback', feedBackController.submitFeedBack);
router.post('/FeedBack/submit-feedback', feedBackController.submitFeedBackOnPost);
// router.get('/update-news', feedBackController.updateNews);

module.exports = router; //export router