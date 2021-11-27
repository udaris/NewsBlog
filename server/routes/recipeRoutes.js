const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');



const mediaController = require('../controllers/mediaController');
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


router.get('/media', mediaController.homepage);
module.exports = router;