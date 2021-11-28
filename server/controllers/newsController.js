require('../models/database');
const Category = require('../models/Category');
const News = require('../models/News');


/**
 * GET /
 * Homepages
 */

exports.homepage = async (req, res) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await News.find({}).sort({ _id: -1 }).limit(limitNumber);
        const local = await News.find({ 'category': 'Local' }).limit(limitNumber);
        const america = await News.find({ 'category': 'America' }).limit(limitNumber);
        const china = await News.find({ 'category': 'China' }).limit(limitNumber);
        const japan = await News.find({ 'category': 'Japan' }).limit(limitNumber);
        const india = await News.find({ 'category': 'India' }).limit(limitNumber);
        const other = await News.find({ 'category': 'Other' }).limit(limitNumber);

        const hot = { latest, local, america, china, japan, india, other };

        res.render('index', { title: 'News Blog - Home', categories, hot });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }

}



/**
 * GET /categories
 * Categories
 */

exports.exploreCategories = async (req, res) => {
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', { title: 'News Blog - Categories', categories });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }

}





/**
 * GET /categories
 * Categories
 */

exports.exploreCategoriesbyId = async (req, res) => {
    try {
        let cateId = req.params.id;
        const limitNumb = 20;
        await News.find({ 'category': cateId }).limit(limitNumb);
        res.render('categories', { title: 'News Blog - Categories', categories });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }

}




/**
 * GET /news/:id
 * news
 */

exports.exploreNews = async (req, res) => {
    try {
        let newsId = req.params.id;
        const news = await News.findById(newsId);
        res.render('news', { title: 'News Blog - News', news });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }

}


/**
 * POST /search
 * Search 
*/
exports.searchNews = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        let news = await News.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
        res.render('search', { title: 'News Blog - Search', news });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }

}


/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async (req, res) => {
    try {
        const limitNumber = 20;
        const news = await News.find({}).sort({ _id: -1 }).limit(limitNumber);
        res.render('explore-latest', { title: 'News Blog - Explore Latest', news });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}


/**
 * GET /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async (req, res) => {
    try {
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let news = await News.findOne().skip(random).exec();
        res.render('explore-random', { title: 'News Blog - Explore Random', news });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}






/**
 * GET /submit-news
 * Submit News
*/
exports.submitNews = async (req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-news', { title: 'News Blog - Submit News',infoErrorsObj,infoSubmitObj });
}



/**
 * Post /submit-news
 * Submit News
*/
exports.submitNewsOnPost = async (req, res) => {
    try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.status(500).send(err);
      })

    }

        const newNews=new News({
           
            name:req.body.name,
            description:req.body.description,
            email:req.body.email,
            ReportDetails:req.body.ReportDetails,
            category:req.body.category,
            image: newImageName,
            date:req.body.date,
            time:req.body.time
        });

        await newNews.save();

        req.flash('infoSubmit', 'News has been added.');
        res.redirect('/submit-news');
    } catch (error) {
        res.json(error);
        //req.flash('infoSubmit', error);
        res.redirect('/submit-news');
    }
 
 }

 
 

/**
 * GET /updateNews/:id
 * update-news
 */
 exports.updateNews = async (req, res) => {
    try{
       let newsId = req.params.id;
       const getNewsdetails = await News.findById(newsId);
       const infoErrorsObj = req.flash('infoErrors');
       const infoSubmitObj = req.flash('infoSubmit');
       res.render('update-news', { title: 'News Blog - Update News', getNewsdetails ,infoErrorsObj,infoSubmitObj });
    }catch (error) {
            res.status(500).send({ message: error.message || "Error Occured" });
    }
}


/**
 * POST /updateNews/:id
 * update-News
 */
exports.updateNewsDetails = async (req, res) => {
    try{
       let newsId = req.params.id;
       const {name,description,email, ReportDetails, category, date, time}=req.body;
       const updateNewsNOw = {
           name,
           description,
           email,
           ReportDetails,
           category,
           date,
           time,
       }
       await News.findByIdAndUpdate(newsId,updateNewsNOw);
      

        req.flash('infoSubmit', 'News has been updated.');
        

       res.redirect('/');
       
    }catch (error) {
           res.status(500).send({ message: error.message || "Error Occured" });
          
    }
}





/**
 * GET /deleteQuestion/:id
 * Question
 */

 exports.deleteNews = async (req, res) => {
    try{
        let newsId = req.params.id;
        await News.findByIdAndDelete(newsId);
        res.redirect('/');
    }catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}




