const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
// const bcrypt = require ('bcrypt');

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
    },
   email : {
        type: String,
        required: [true,"Email is required"],
        unique: true
    },
    password: {
        type: String,
         required: [true,"password is required"]
    }
    
});
// creating a model to represent out collection in DB
const User = mongoose.model('user', userSchema); 
// export the user model:
module.exports = User;