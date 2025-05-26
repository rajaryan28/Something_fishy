const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    post:{
        type:"string",
        required:true
    },
    likes: {
    type: Number,
    default: 0,
   },
    date:{
        type:Date,
        default:Date.now
    }
    
  });

module.exports=mongoose.model('post',PostSchema)