const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const questionController = require('../controllers/questionController');
const userController = require('../controllers/userController');

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


router.get('/delete-news/:id', newsController.deleteNews);
router.get('/update-news/:id', newsController.updateNews);
router.post('/update-newsDetails/:id', newsController.updateNewsDetails);


router.get('/media', mediaController.homepage);
router.get('/mediacategories', mediaController.exploreMediacategories);
router.get('/media/:id', mediaController.exploreMedia );
router.get('/mediacategories/:id', mediaController.exploreMediacategoriesById);
router.get('/mediaexplore-latest', mediaController.exploreLatest);
router.get('/mediaexplore-random', mediaController.exploreRandom);
router.get('/submit-media', mediaController.submitMedia);
router.post('/submit-media', mediaController.submitMediaOnPost);

router.get('/question',questionController.question);
router.get('/submit-question', questionController.submitQuestion);
router.post('/submit-question', questionController.submitQuestionOnPost);
router.get('/update-question/:id', questionController.updateQuestion);
router.get('/delete-question/:id', questionController.deleteQuestion);
router.post('/update-questionrecord/:id', questionController.updateQuestionRecord);


router.get('/Allusers', userController.exploreUsers);
router.get('/profile/:id', userController.exploreUsersById);
router.get('/updateUser/:id', userController.updateUser);
router.post('/updateUserRecord/:id', userController.updateUserRecord);
router.get('/deleteUser/:id', userController.deleteUser);
router.put('/update/:id', userController.EditUser)
router.delete('/delete/:id', userController.DeleteUser)
router.get('/users', userController.userNav)
router.post('/users', userController.newUser)



module.exports = router;