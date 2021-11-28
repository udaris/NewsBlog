const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    description: {
        type: String,
        required: 'This field is required.'
    },
    image: {
        type: String,
        // required: 'This fild is required.'
    },
    date: {
        type: String,
        required: 'This field is required.'
    },
    time: {
        type: String,
        required: 'This field is required.'
    },
});

feedbackSchema.index({ name: 'text', description: 'text' });
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });



module.exports = mongoose.model('FeedBack', feedbackSchema);
