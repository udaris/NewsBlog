const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'username is required.',

    },
    email: {
        type: String,
        required: 'Email is required.',
        unique:true,

    },
    gender:{  
        type:String,
        required:['gender is required'],
        enum:['male','female'],

    },
    password:{  
        type:String,
        required:[true,'A user must have a password'],
        minlength:4,
        select:false,
    },
    address: {
        type: String,
        required: 'Address is required.',
        unique:true,

    },
},{
    writeConcern: {
     w: true,
      wtimeout: 1000
    }
  });

module.exports = mongoose.model('User', userSchema);
