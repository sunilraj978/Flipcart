const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        min:3,
        max:20,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        min:3,
        max:20,
        required:true
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    contactNum:{
        type:String
    },
    profilePicture:{
        type:String
    },

},{timestamps:true})


const user = mongoose.model('User',userSchema);

module.exports = user;