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
        res.satus(500).send({ message: error.message || "Error Occured" });
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
        res.satus(500).send({ message: error.message || "Error Occured" });
    }

}





/**
 * GET /categories
 * Categories
 */

exports.exploreCategoriesbyId = async (req, res) => {
    try {
        let cateId = req.params.id;
        const limitNumber = 20;
        const cateById = await News.find({ 'category': cateId }).limit(limitNumber);
        res.render('categories', { title: 'News Blog - Categories', categories });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Occured" });
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
        res.satus(500).send({ message: error.message || "Error Occured" });
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
        res.satus(500).send({ message: error.message || "Error Occured" });
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
        res.satus(500).send({ message: error.message || "Error Occured" });
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
        res.satus(500).send({ message: error.message || "Error Occured" });
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
        if(err) return res.satus(500).send(err);
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
 * GET /update-news
 * Update News
*/
// exports.updateNews = async (req, res) => {

//     try {
//         let newsId = req.params.id;
//         const news = await News.findById(newsId);
       
//         res.render('update-news', { title: 'News Blog - update-news', news });
//     } catch (error) {
//         res.render('update-news', { title: 'News Blog - Submit News' });
//        // res.satus(500).send({ message: error.message || "Error Occured" });
//     }
//     //const infoErrorsObj = req.flash('infoErrors');
//     //const infoSubmitObj = req.flash('infoSubmit');

// }
exports.updateNews = async (req, res) => {
    try {
        let newsId = req.params.id;
        const news = await News.findById(newsId);
        res.render('news', { title: 'News Blog - News', news });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Occured" });
    }

}


//Delete Recipe
// async function deleteRecipe(){
//   try {
//     await News.deleteOne({ name: 'Reduncy of Gas in the country' });
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteRecipe();


//Update Recipe
// async function updateRecipe(){
//   try {
//     const res = await News.updateOne({ name: 'New Recipe Updated' }, { name: 'Reduncy of Gas in the country' });
//     res.n; // Number of documents matched
//     res.nModified; // Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }
// updateRecipe();











 // name:'Reduncy of Gas in the country',
            // description:'In theseday, everywhere in the courty people have to face gas reduncy in the market.',
            // email:'udari@gmail.com',
            // ReportDetails:'2021/11/17',
            // category:'America',
            // image:'im.jpg',
            // date:'2021/11/17',
            // time:'11.00am'



// async function insertDymmyCategoryData() {
//     try {
//         await Category.insertMany([
//             {
//                         "name": "Thai",
//                         "image": "thai-food.jpg"
//                       },
//                       {
//                         "name": "American",
//                         "image": "american-food.jpg"
//                       }, 
//                       {
//                         "name": "Chinese",
//                         "image": "chinese-food.jpg"
//                       },
//                       {
//                         "name": "Mexican",
//                         "image": "mexican-food.jpg"
//                       }, 
//                       {
//                         "name": "Indian",
//                         "image": "indian-food.jpg"
//                       },
//                       {
//                         "name": "Spanish",
//                         "image": "spanish-food.jpg"
//                       }
//         ]);

//     } catch (error) {
//         console.log('err' + error)
//     }
// }

// insertDymmyCategoryData();


// async function insertNewsData() {
//     try {
//         await News.insertMany([
//             {
//                 "name": "Flood risk in Ratnapura district",
//                 "description": `Flood risk in Ratnapura district is raising with huge  volumes of rains. People are in troubles many to face a lot of problems.`,
//                 "email": "unews@u.co.uk",
//                 "ReportDetails": [
//                     "Date : 2021/11/11",
//                     "Time : 10.00am",
//                     "Report: Mis. udari",
//                 ],
//                 "category": "Local",
//                 "image": "flood.jpg",
//                 "date":"2021/11/11",
//                 "time":"10.00am"
//             },
//             {
//                 "name": "Flood risk in Godawaya district",
//                 "description": `Flood risk in Godawaya district is raising with huge  volumes of rains. People are in troubles many to face a lot of problems.`,
//                 "email": "unews@u.co.uk",
//                 "ReportDetails": [
//                     "Date : 2021/11/11",
//                     "Time : 10.00am",
//                     "Report: Mis. udari",
//                 ],
//                 "category": "Local",
//                 "image": "fl2.jpg",
//                 "date":"2021/11/11",
//                 "time":"10.00am"
//             },

//         ]);

//     } catch (error) {
//         console.log('err' + error)
//     }
// }

// insertNewsData();

