require('../models/database');
const Question = require('../models/Question');



/**
 * GET /Question
 * Question
 */
exports.question = async (req, res) => {
    try{
        const questions = await Question.find({});
        res.render('Question/question', { title: 'Social Network - Question',questions });
    }catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}




/**
 * GET /submit-questions
 * Submit Question
*/
exports.submitQuestion = async (req, res) => {
    try{
        const infoErrorsObj = req.flash('infoErrors');
        const infoSubmitObj = req.flash('infoSubmit');
        res.render('Question/submit-question', { title: 'News Blog - Submit Question',infoErrorsObj,infoSubmitObj });
    }catch (error) {
            res.status(500).send({ message: error.message || "Error Occured" });
    }
}

/**
 * POST /submit-questions
 * Submit Question
*/
exports.submitQuestionOnPost = async (req, res) => {
    try{
        const newQuestion =new Question({
            question:req.body.question,
            answer:req.body.answer,
            username:req.body.username,
            field:req.body.field
        });
        await newQuestion.save();
        req.flash('infoSubmit','Question has been already added');
        res.redirect('/Question/question');
        
    }catch (error) {
           // req.flash('infoErrors',error)
           res.json(error);
            res.redirect('/Question/submit-question');
    }
}



/**
 * GET /updateQuestion/:id
 * update-question
 */
exports.updateQuestion = async (req, res) => {
    try{
       let questionId = req.params.id;
       const getdetails = await Question.findById(questionId);
       res.render('Question/update-question', { title: 'News Blog - Update-Question',getdetails });
    }catch (error) {
            res.status(500).send({ message: error.message || "Error Occured" });
    }
}


/**
 * POST /updateQuestion/:id
 * update-Question
 */
exports.updateQuestionRecord = async (req, res) => {
    try{
       let questionId = req.params.id;
       const {question,answer,field}=req.body;
       const updatingQuestion = {
           question,
           answer,
           field
       }
       const update = await Question.findByIdAndUpdate(questionId,updatingQuestion);
       res.redirect('/Question/question');
    }catch (error) {
            res.status(500).send({ message: error.message || "Error Occured" });
    }
}



/**
 * GET /deleteQuestion/:id
 * Question
 */

exports.deleteQuestion = async (req, res) => {
    try{
        let questionId = req.params.id;
        await Question.findByIdAndDelete(questionId);
        res.redirect('/Question/question');
    }catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}
