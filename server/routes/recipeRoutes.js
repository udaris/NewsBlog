const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const questionController = require('../controllers/questionController');


/**
 * App routes
 */

router.get('/', newsController.homepage);
router.get('/categories', newsController.exploreCategories);
router.get('/news/:id', newsController.exploreNews);
router.get('/categories/:id', newsController.exploreCategoriesbyId);
router.post('/search', newsController.searchNews);
router.get('/explore-latest', newsController.exploreLatest);
router.get('/explore-random', newsController.exploreRandom);
router.get('/submit-news', newsController.submitNews);
router.post('/submit-news', newsController.submitNewsOnPost);
router.get('/update-news', newsController.updateNews);


/*


router.get('/delete-question', newsController.deleteQuestion);*/
router.get('/question',questionController.question);
router.get('/submit-question', questionController.submitQuestion);
router.post('/submit-question', questionController.submitQuestionOnPost);
router.get('/update-question/:id', questionController.updateQuestion);
router.get('/delete-question/:id', questionController.deleteQuestion);
router.post('/update-questionrecord/:id', questionController.updateQuestionRecord);

module.exports = router; //export router