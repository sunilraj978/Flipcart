const mongoose = require('mongoose')


const pageSchema = mongoose.Schema({
   title:{
       type:String,
       required:true,
       trim:true
   },
   description:{
       type:String,
       required:true,
       trim:true
   },
   banners:[
       {
           img:{type:String},
           navigateTo:{type:String}
       }
   ],
   products:[
       {
           img:{type:String},
           navigateTo:{type:String}
       }
   ],
   category:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Category",
       required:true,
       unique:true
   },
   createdBy:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
   }
},{timestamps:true})

const page = mongoose.model("Page",pageSchema)

module.exports = page