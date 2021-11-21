const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This fild is required.'
    },
    description: {
        type: String,
        required: 'This fild is required.'
    },
    email: {
        type: String,
        required: 'This fild is required.'
    },
    ReportDetails: {
        type: Array,
        required: 'This fild is required.'
    },
    category: {
        type: String,
        enum:['Local','America', 'China', 'Japan', 'India', 'Other'],
        required: 'This fild is required.'
    },
    image: {
        type: String,
        required: 'This fild is required.'
    },
    date: {
        type: String,
        required: 'This fild is required.'
    },
    time: {
        type: String,
        required: 'This fild is required.'
    },
});

newsSchema.index({ name: 'text', description: 'text' });
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });



module.exports = mongoose.model('News', newsSchema);
