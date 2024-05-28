const mongoose = require('mongoose')


const mongooseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String,
    },
    categoryImg:{
        type:String
    },
    parentId:{
        type:String
    }    
},{timestamps:true})

const category = mongoose.model('Category',mongooseSchema)

module.exports = category;