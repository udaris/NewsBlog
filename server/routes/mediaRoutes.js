const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');


router.get('/media', mediaController.homepage);
router.get('/categories', mediaController.exploreCategories);
router.get('/media/:id', mediaController.exploreMedia );
router.get('/categories/:id', mediaController.exploreCategoriesById);
router.post('/search', mediaController.searchMedia);
router.get('/explore-latest', mediaController.exploreLatest);
router.get('/explore-random', mediaController.exploreRandom);
router.get('/submit-media', mediaController.submitMedia);
router.post('/submit-media', mediaController.submitMediaOnPost);


module.exports = router;