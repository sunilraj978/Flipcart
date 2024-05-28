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
    price:{
        type:Number,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    offer:{
        type:Number
    },
    productImg:[
        {
            img:{
                type:String
            }
        }
    ],
    quantity:{
        type:String,
        trim:true
    },
    reviews:[
        {
            userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
            review:String
        }
    ],
    category:{
        type:mongoose.Schema.Types.ObjectId,ref:"Category",
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
    updatedAt:Date, 
},{timestamps:true})

const product = mongoose.model('Product',mongooseSchema)

module.exports = product;