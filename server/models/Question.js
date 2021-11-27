const mongoose= require('mongoose');

const questionSchema = new mongoose.Schema({

    question:{
        type :String,
        required:'This is required.'
    },

    answer:{
        type :String,
        required:'This is required.'
    },
    
    username:{
        type :String,
        required:'This is required.'
    },
});

module.exports = mongoose.model('Question',questionSchema);  //Question is the collection
