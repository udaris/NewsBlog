require('../models/database');
const FeedBack = require('../models/FeedBack');
// const News = require('../models/News');



/**
 * GET /feedback
 * feedBack
 */

exports.exploreFeedBack = async (req, res) => {
    try {
        const limitNumber = 20;
        const feedback = await FeedBack.find({}).limit(limitNumber);
        res.render('FeedBack/feedback', { title: 'News Blog - FeedBack', feedback });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }

}



/**
 * GET /submit-feedback
 * Submit feedback
 */
exports.submitFeedBack = async (req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('FeedBack/submit-feedback', { title: 'News Blog - Submit FeedBack',infoErrorsObj,infoSubmitObj });
}



/**
 * Post /submit-feedback
 * Submit feedback
 */
exports.submitFeedBackOnPost = async (req, res) => {
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

        const newFeedBack=new FeedBack({

            name:req.body.name,
            description:req.body.description,
            image: newImageName,
            date:req.body.date,
            time:req.body.time
        });

        await newFeedBack.save();

        req.flash('infoSubmit', 'News has been added.');
        res.redirect('/FeedBack/submit-feedback');
    } catch (error) {
        res.json(error);
        res.redirect('/FeedBack/submit-feedback');
    }

}

/**
 * GET /deleteFeedBack/:id
 * FeedBack
 */

exports.deleteFeedBack = async (req, res) => {
    try{
        let feedbackId = req.params.id;
        await FeedBack.findByIdAndDelete(feedbackId);
        res.redirect('/FeedBack/feedback');
    }catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }
}

/**
 * POST /updateQuestion/:id
 * update-Question
 */
exports.updateFeedBackRecord = async (req, res) => {
    try{
        let feedbackId = req.params.id;
        const {name,description,image,date,time}=req.body;
        const updatingFeedBack = {
            name,
            description,
            image,
            date,
            time
        }
        await FeedBack.findByIdAndUpdate(feedbackId,updatingFeedBack);
        res.redirect('/FeedBack/feedback');
    }catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }
}

/**
 * GET /update-feedback
 * Update feedback
 */
exports.updateFeedBack = async (req, res) => {
    try {
        let feedbackId = req.params.id;
        const updateFeedback = await FeedBack.findById(feedbackId);
        res.render('FeedBack/update-feedback', { title: 'News Blog - FeedBack', updateFeedback });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }
}

/**
 * POST /search
 * Search
 */
exports.searchFeedBack = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        let searchFeedback = await FeedBack.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
        res.render('FeedBack/searchFeedBack', { title: 'News Blog - Search', searchFeedback });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }

}

