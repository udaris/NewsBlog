require('../models/mediaDatabase');
const Category = require('../models/mediaCategory');
const Media = require('../models/Media');


exports.homepage = async(req, res) => {
    try {
        const limitNumber = 5;
        const mediacategories = await Category.find({}).limit(limitNumber);    
        const latest = await Media.find({}).sort({_id: -1}).limit(limitNumber);
        const local = await Media.find({ 'category': 'Local' }).limit(limitNumber);
        const sports = await Media.find({ 'category': 'Sports' }).limit(limitNumber);
        const global = await Media.find({ 'category': 'Global' }).limit(limitNumber);
        const weather = await Media.find({ 'category': 'Weather' }).limit(limitNumber);
        const gossip = await Media.find({ 'category': 'Gossip' }).limit(limitNumber);


        const news = { latest,local, sports,global,weather,gossip };

        res.render('jobs/media-index', { title: 'Social media and News for IN 3400 - Home', mediacategories,news } );
      } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
      }
}


// GET mediacategories

exports.exploreMediacategories = async(req, res) => {
    try {
        const limitNumber = 20;
        const mediacategories = await Category.find({}).limit(limitNumber);       
        res.render('jobs/mediacategories', { title: 'Social media and News for IN 3400 - Categories', mediacategories } );
      } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
      }
}


/**
 * GET /mediacategories/:id
 * Categories By Id
*/
exports.exploreMediacategoriesById = async(req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Media.find({ 'category': categoryId }).limit(limitNumber);
    res.render('jobs/mediacategories', { title: 'Social media and News for IN 3400 - Categoreis', categoryById } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 




// GET media

exports.exploreMedia = async(req, res) => {
    try {
      let mediaId = req.params.id;
      const media = await Media.findById(mediaId);
      res.render('jobs/media', { title: 'Social media and News for IN 3400 - Media', media } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 

/*
  * POST /search
  * Search 
 */
 exports.searchMedia = async(req, res) => {
   try {
     let searchTerm = req.body.searchTerm;
     let media = await Media.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
     res.render('search', { title: 'Social media and News for IN 3400 - Search', media } );
   } catch (error) {
     res.satus(500).send({message: error.message || "Error Occured" });
   }
   
 }

 /**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber = 20;
    const media = await Media.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('jobs/mediaexplore-latest', { title: 'Social media and News for IN 3400 - Explore Latest', media } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 



/**
 * GET /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async(req, res) => {
  try {
    let count = await Media.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let media = await Media.findOne().skip(random).exec();
    res.render('jobs/mediaexplore-random', { title: 'Social media and News for IN 3400 - Explore Latest', media } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /submit-Media
 * Submit Media
*/
exports.submitMedia = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('jobs/submit-media', { title: 'Social media and News for IN 3400 - Submit Media', infoErrorsObj, infoSubmitObj  } );
}


exports.submitMediaOnPost = async(req, res) => {
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

    const newMedia = new Media({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newMedia.save();

    req.flash('infoSubmit', 'Media has been added.')
    res.redirect('/submit-media');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', error);
    res.redirect('/submit-media');
  }
}




// async function insertDymmyCategoryData(){
//     try{
// await Category.insertMany([
//     {
//         "name" : "Thai",
//         "image" : "thai-food.jpg"
//     },
//     {
//         "name" : "American",
//         "image" : "american-food.jpg"
//     },
//     {
//         "name" : "Chinese",
//         "image" : "chinese-food.jpg"
//     },
//     {
//         "name" : "Mexican",
//         "image" : "mexican-food.jpg"
//     },
//     {
//         "name" : "Indian",
//         "image" : "indian-food.jpg"
//     },
//     {
//         "name" : "Spanish",
//         "image" : "spanish-food.jpg"
//     }    
// ]);
//     } catch (error){
// console.log('err', + error)
//     }
// }

// insertDymmyCategoryData();




// async function insertDymmyRecipeData(){
//     try{
//         await Recipe.insertMany([
//                   { 
//                     "name": "Southern Friend Chicken",
//                     "description": `Recipe Description Goes Here`,
//                     "email": "recipeemail@raddy.co.uk",
//                     "ingredients": [
//                       "1 level teaspoon baking powder",
//                       "1 level teaspoon cayenne pepper",
//                       "1 level teaspoon hot smoked paprika",
//                     ],
//                     "category": "American", 
//                     "image": "southern-friend-chicken.jpg"
//                   },
//                   { 
//                     "name": "Nothern chicken",
//                     "description": `Recipe Description Goes Here`,
//                     "email": "recipeemail@raddy.co.uk",
//                     "ingredients": [
//                       "1 level teaspoon baking powder",
//                       "1 level teaspoon cayenne pepper",
//                       "1 level teaspoon hot smoked paprika",
//                     ],
//                     "category": "American", 
//                     "image": "nothern-friend-chicken.jpg"
//                   },
//                    { 
//                         "name": "Assortment",
//                         "description": `Recipe Description Goes Here`,
//                         "email": "recipeemail@raddy.co.uk",
//                         "ingredients": [
//                           "1 level teaspoon baking powder",
//                           "1 level teaspoon cayenne pepper",
//                           "1 level teaspoon hot smoked paprika",
//                         ],
//                         "category": "American", 
//                         "image": "assortment.jpg"
//                       },
//                 ]);
//     } catch (error){
// console.log('err', + error)
//     }
// }

// insertDymmyRecipeData();




// async function insertDymmyRecipeData(){
//     try{
//         await Recipe.insertMany([
//                   { 
//                     "name": "Southern Friend Chicken",
//                     "description": `Recipe Description Goes Here`,
//                     "email": "recipeemail@raddy.co.uk",
//                     "ingredients": [
//                       "1 level teaspoon baking powder",
//                       "1 level teaspoon cayenne pepper",
//                       "1 level teaspoon hot smoked paprika",
//                     ],
//                     "category": "Thai", 
//                     "image": "thai1.jfif"
//                   },
//                   { 
//                     "name": "Nothern chicken",
//                     "description": `Recipe Description Goes Here`,
//                     "email": "recipeemail@raddy.co.uk",
//                     "ingredients": [
//                       "1 level teaspoon baking powder",
//                       "1 level teaspoon cayenne pepper",
//                       "1 level teaspoon hot smoked paprika",
//                     ],
//                     "category": "Thai", 
//                     "image": "pad-thai-5.jpg"
//                   },
//                    { 
//                         "name": "Assortment",
//                         "description": `Recipe Description Goes Here`,
//                         "email": "recipeemail@raddy.co.uk",
//                         "ingredients": [
//                           "1 level teaspoon baking powder",
//                           "1 level teaspoon cayenne pepper",
//                           "1 level teaspoon hot smoked paprika",
//                         ],
//                         "category": "Thai", 
//                         "image": "Food-in-Thailand.jpg"
//                       },
//                 ]);
//     } catch (error){
// console.log('err', + error)
//     }
// }

// insertDymmyRecipeData();