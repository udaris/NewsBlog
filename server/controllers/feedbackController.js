require('../models/database');
const FeedBack = require('../models/FeedBack');
// const News = require('../models/News');


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

