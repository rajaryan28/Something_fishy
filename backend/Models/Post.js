const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema({
    post:{
        type:"string",
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
    
  });

module.exports=mongoose.model('post',PostSchema)